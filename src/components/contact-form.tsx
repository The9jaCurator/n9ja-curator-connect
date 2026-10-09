import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  Mail,
  MessageCircle,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_RECIPIENT, contactSchema, type ContactInput } from "@/lib/contact-schema";

const EMAILJS_PUBLIC_KEY =
  (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined) || "id-kOFQ2ufXotqFuh";
const EMAILJS_SERVICE_ID =
  (import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined) || "service_p3lkcqh";
const EMAILJS_TEMPLATE_ID =
  (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined) || "template_nj4zd3h";

interface ContactFormProps {
  selectedCategory?: string;
  selectedPackage?: string;
  onSuccess?: (data: ContactInput) => void;
}

type FormState = "idle" | "submitting" | "success" | "error";

const defaultCategory = "Gadgets & Tech Accessories";

export function ContactForm({ selectedCategory, selectedPackage, onSuccess }: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [submittedData, setSubmittedData] = useState<ContactInput | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    category: selectedCategory || defaultCategory,
    email: "",
    message: "",
    packageName: selectedPackage || "",
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
    [errors],
  );

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      company: "",
      category: selectedCategory || defaultCategory,
      email: "",
      message: "",
      packageName: selectedPackage || "",
    });
    setErrors({});
    setServerError(null);
  }, [selectedCategory, selectedPackage]);

  const copyBriefToClipboard = useCallback(async () => {
    const text = [
      `Collaboration Brief for The 9ja Curator (${CONTACT_RECIPIENT})`,
      `Brand / Company: ${formData.company || "Not specified"}`,
      `Contact Name: ${formData.name}`,
      `Contact Email: ${formData.email}`,
      `Product Category: ${formData.category}`,
      `Partnership Package: ${formData.packageName || "General Inquiry"}`,
      `Message:`,
      formData.message,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  }, [formData]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("submitting");
    setErrors({});
    setServerError(null);

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
      setFormState("error");
      return;
    }

    try {
      const { name, company, category, email, message, packageName } = validation.data;

      const templateParams = {
        to_email: CONTACT_RECIPIENT,
        to_name: "The 9ja Curator",
        from_name: name,
        from_email: email,
        company_name: company,
        category,
        package_interest: packageName || "General Partnership Inquiry",
        message,
        submission_date: new Date().toLocaleDateString("en-NG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      if (response.status === 200 || response.text === "OK") {
        setSubmittedData(validation.data);
        setFormState("success");
        onSuccess?.(validation.data);
      } else {
        throw new Error(`Email delivery service returned code ${response.status}`);
      }
    } catch (error) {
      console.warn("Email service dispatch error:", error);
      setServerError(
        `Email delivery service returned an error (${error instanceof Error ? error.message : "check network"}). Your brief is saved—you can launch your email app below pre-addressed to ${CONTACT_RECIPIENT}, or retry submission.`,
      );
      setFormState("error");
    }
  }

  const mailtoSubject = encodeURIComponent(
    `Brand Collaboration Brief: ${formData.company || "New Brand"} x The 9ja Curator`,
  );
  const mailtoBody = encodeURIComponent(
    `Hello The 9ja Curator Team,

Here is our collaboration brief:

• Name: ${formData.name || "N/A"}
• Brand / Company: ${formData.company || "N/A"}
• Email: ${formData.email || "N/A"}
• Product Category: ${formData.category}
• Package Interest: ${formData.packageName || "General Inquiry"}

Message:
${formData.message || "N/A"}

---
Target Inbox: ${CONTACT_RECIPIENT}`,
  );
  const mailtoHref = `mailto:${CONTACT_RECIPIENT}?subject=${mailtoSubject}&body=${mailtoBody}`;

  const waText = encodeURIComponent(
    `Hi The 9ja Curator team, I'm ${formData.name || "a partner"} from ${formData.company || "our brand"}. We would like to collaborate on ${formData.category}${formData.packageName ? ` (${formData.packageName})` : ""}. Brief summary: ${formData.message || "Looking forward to speaking."}`,
  );
  const waHref = `https://wa.me/2348000000000?text=${waText}`;

  if (formState === "success" && submittedData) {
    return (
      <div className="success-confirmation">
        <div className="success-panel">
          <CheckCircle2 />
          <span className="success-badge">
            <Check size={13} /> Verified Delivery to {CONTACT_RECIPIENT}
          </span>
          <h3>Collaboration brief sent!</h3>
          <p>
            Thank you for reaching out, <strong>{submittedData.name}</strong>. Your inquiry on
            behalf of <strong>{submittedData.company}</strong> has been transmitted directly to our
            editorial inbox.
          </p>

          <div className="success-summary">
            <div className="success-summary-row">
              <span className="success-summary-label">Company:</span>
              <span className="success-summary-val">{submittedData.company}</span>
            </div>
            <div className="success-summary-row">
              <span className="success-summary-label">Category:</span>
              <span className="success-summary-val">{submittedData.category}</span>
            </div>
            {submittedData.packageName && (
              <div className="success-summary-row">
                <span className="success-summary-label">Package:</span>
                <span className="success-summary-val">{submittedData.packageName}</span>
              </div>
            )}
            <div className="success-summary-row">
              <span className="success-summary-label">Primary Inbox:</span>
              <span className="success-summary-val">{CONTACT_RECIPIENT}</span>
            </div>
          </div>

          <p className="success-detail">
            We review incoming brand briefs and reply within <strong>2–3 business days</strong>.
          </p>

          <div className="form-actions mt-6">
            <Button
              onClick={() => {
                setFormState("idle");
                setSubmittedData(null);
                resetForm();
              }}
              className="btn-primary"
            >
              Submit another brief
            </Button>
            <a
              href={`mailto:${CONTACT_RECIPIENT}`}
              className="fallback-btn"
              title="Send direct email"
            >
              <Mail size={15} /> Direct email
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      {formState === "error" && (
        <div className="form-error-banner" role="alert">
          <div className="form-error-header">
            <AlertCircle />
            <div>
              <strong>Submission Notice</strong>
              <p>{serverError || "Please check the highlighted fields below and correct them."}</p>
            </div>
          </div>

          {serverError && (
            <div className="form-fallback-box">
              <p>Send directly to the verified inbox:</p>
              <div className="fallback-btn-group">
                <a href={mailtoHref} className="fallback-btn">
                  <Mail size={14} /> Open in Mail App ({CONTACT_RECIPIENT})
                </a>
                <button type="button" onClick={copyBriefToClipboard} className="fallback-btn">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied to clipboard!" : "Copy brief text"}
                </button>
                <a href={waHref} target="_blank" rel="noreferrer noopener" className="fallback-btn">
                  <MessageCircle size={14} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          )}
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
            className={`form-control ${errors.name ? "form-control-error" : ""}`}
            disabled={formState === "submitting"}
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
            className={`form-control ${errors.company ? "form-control-error" : ""}`}
            disabled={formState === "submitting"}
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
            className={`form-control ${errors.category ? "form-control-error" : ""}`}
            disabled={formState === "submitting"}
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
            className={`form-control ${errors.email ? "form-control-error" : ""}`}
            disabled={formState === "submitting"}
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
            placeholder="e.g. Starter Spotlight Package, Growth Integration, Ambassador"
            className="form-control"
            disabled={formState === "submitting"}
          />
          <span className="form-note">
            Selected package will be highlighted in the brief sent to {CONTACT_RECIPIENT}.
          </span>
        </div>

        <div className="form-field form-wide">
          <label htmlFor="message">Collaboration Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your product, campaign goals, target audience, and preferred timeline..."
            className={`form-control ${errors.message ? "form-control-error" : ""}`}
            disabled={formState === "submitting"}
          />
          {errors.message && <span className="form-error-text">{errors.message}</span>}
        </div>
      </div>

      <div className="form-actions">
        <Button type="submit" disabled={formState === "submitting"} className="form-submit-button">
          {formState === "submitting" ? (
            <>
              <span className="spinner" />
              Transmitting brief...
            </>
          ) : (
            <>
              Send brief to {CONTACT_RECIPIENT}
              <ChevronRight size={15} />
            </>
          )}
        </Button>

        {formState === "error" && (
          <button
            type="button"
            onClick={resetForm}
            className="fallback-btn"
            title="Reset form fields"
          >
            <RotateCcw size={14} /> Clear
          </button>
        )}

        <p className="form-disclaimer">
          Briefs delivered to <strong>{CONTACT_RECIPIENT}</strong>. Typical response within 2–3
          business days.
        </p>
      </div>
    </form>
  );
}
