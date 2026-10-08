import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contactSchema, type ContactInput } from '@/lib/contact-schema';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
// Get this from your EmailJS account: https://dashboard.emailjs.com/admin/account
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';

if (EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

interface ContactFormProps {
  selectedCategory?: string;
  selectedPackage?: string;
  onSuccess?: (data: ContactInput) => void;
}

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const defaultCategory = 'Gadgets & Tech Accessories';

export function ContactForm({
  selectedCategory,
  selectedPackage,
  onSuccess,
}: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [submittedData, setSubmittedData] = useState<ContactInput | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    category: selectedCategory || defaultCategory,
    email: '',
    message: '',
    packageName: selectedPackage || '',
  });

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFormData((previous) => ({
        ...previous,
        [name]: value,
      }));

      if (errors[name as keyof ContactInput]) {
        setErrors((previous) => ({
          ...previous,
          [name]: undefined,
        }));
      }
    },
    [errors]
  );

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      company: '',
      category: selectedCategory || defaultCategory,
      email: '',
      message: '',
      packageName: selectedPackage || '',
    });
    setErrors({});
    setServerError(null);
  }, [selectedCategory, selectedPackage]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState('submitting');
    setErrors({});
    setServerError(null);

    // Client-side validation first
    const validation = contactSchema.safeParse({
      name: formData.name,
      company: formData.company,
      category: formData.category,
      email: formData.email,
      message: formData.message,
      packageName: formData.packageName,
    });

    if (!validation.success) {
      const nextErrors: Partial<Record<keyof ContactInput, string>> = {};
      validation.error.errors.forEach((issue) => {
        const key = issue.path[0] as keyof ContactInput;
        nextErrors[key] = issue.message;
      });
      setErrors(nextErrors);
      setFormState('error');
      return;
    }

    try {
      // Check if EmailJS is properly configured
      if (EMAILJS_PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') {
        setServerError(
          'Email service is not configured. Please contact the site administrator.'
        );
        setFormState('error');
        return;
      }

      const { name, company, category, email, message, packageName } = validation.data;

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: 'the9jacurator@gmail.com',
          from_name: name,
          from_email: email,
          company_name: company,
          category: category,
          package_interest: packageName || 'Not specified',
          message: message,
          submission_date: new Date().toLocaleDateString('en-NG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        },
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setSubmittedData(validation.data);
        setFormState('success');
        resetForm();

        onSuccess?.(validation.data);

        // Auto-reset success state after 6 seconds
        window.setTimeout(() => {
          setFormState('idle');
          setSubmittedData(null);
        }, 6000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setServerError(
        'Failed to send your message. Please try again or contact support.'
      );
      setFormState('error');
    }
  }

  if (formState === 'success' && submittedData) {
    return (
      <div className="success-confirmation">
        <div className="success-panel">
          <CheckCircle2 />
          <h3>Message received!</h3>
          <p>
            Thank you for reaching out, {submittedData.name}. We have received your collaboration
            brief and will review it shortly.
          </p>
          <p className="success-detail">
            Confirmation sent to <strong>{submittedData.email}</strong>
          </p>
          <Button
            onClick={() => {
              setFormState('idle');
              setSubmittedData(null);
            }}
            className="mt-6"
          >
            Send another inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      {formState === 'error' && (serverError || Object.keys(errors).length > 0) && (
        <div className="form-error-banner" role="alert">
          <AlertCircle />
          <p>
            {serverError || 'Please correct the highlighted fields and try again.'}
          </p>
        </div>
      )}

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="name">Your name *</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Jane Doe"
            className={`form-control ${errors.name ? 'form-control-error' : ''}`}
            disabled={formState === 'submitting'}
          />
          {errors.name && <span className="form-error-text">{errors.name}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="company">Brand / Company name *</label>
          <input
            id="company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Your Brand"
            className={`form-control ${errors.company ? 'form-control-error' : ''}`}
            disabled={formState === 'submitting'}
          />
          {errors.company && <span className="form-error-text">{errors.company}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="category">Product category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`form-control ${errors.category ? 'form-control-error' : ''}`}
            disabled={formState === 'submitting'}
          >
            <option value="Gadgets & Tech Accessories">Gadgets & Tech Accessories</option>
            <option value="Skincare Products">Skincare Products</option>
            <option value="Fashion Accessories">Fashion Accessories</option>
            <option value="Multi-category / Other">Multi-category / Other</option>
          </select>
          {errors.category && <span className="form-error-text">{errors.category}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email address *</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="jane@brandname.com"
            className={`form-control ${errors.email ? 'form-control-error' : ''}`}
            disabled={formState === 'submitting'}
          />
          {errors.email && <span className="form-error-text">{errors.email}</span>}
        </div>

        <div className="form-field form-wide">
          <label htmlFor="packageName">Partnership package interest (optional)</label>
          <input
            id="packageName"
            type="text"
            name="packageName"
            value={formData.packageName}
            onChange={handleInputChange}
            placeholder="e.g. Starter Spotlight Package"
            className="form-control"
            disabled={formState === 'submitting'}
          />
          <span className="form-note">Let us know which package you have in mind, or leave blank to explore options.</span>
        </div>

        <div className="form-field form-wide">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your product, goals, audience, and what you'd like to build together..."
            className={`form-control ${errors.message ? 'form-control-error' : ''}`}
            disabled={formState === 'submitting'}
          />
          {errors.message && <span className="form-error-text">{errors.message}</span>}
        </div>
      </div>

      <div className="form-actions">
        <Button type="submit" disabled={formState === 'submitting'} className="form-submit-button">
          {formState === 'submitting' ? (
            <>
              <span className="spinner" />
              Sending...
            </>
          ) : (
            <>
              Send brief
              <ChevronRight />
            </>
          )}
        </Button>
        <p className="form-disclaimer">We typically respond within 2–3 business days.</p>
      </div>
    </form>
  );
}
