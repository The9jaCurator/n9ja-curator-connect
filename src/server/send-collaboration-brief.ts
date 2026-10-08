'use server';

import { Resend } from 'resend';
import { contactSchema, type ContactInput, CONTACT_RECIPIENT } from '~/lib/contact-schema';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendBriefResponse {
  success: boolean;
  message: string;
  error?: string;
}

export async function sendCollaborationBrief(
  data: ContactInput
): Promise<SendBriefResponse> {
  try {
    // Validate the input data on the server
    const validation = contactSchema.safeParse(data);

    if (!validation.success) {
      return {
        success: false,
        message: 'Validation failed',
        error: 'Invalid form data',
      };
    }

    const { name, company, category, email, message, packageName } = validation.data;

    // Format the email content
    const emailContent = `
<h2>Collaboration Brief from The 9ja Curator</h2>
<hr />
<p><strong>Name:</strong> ${name}</p>
<p><strong>Brand / Company:</strong> ${company}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Category:</strong> ${category}</p>
${packageName ? `<p><strong>Package Interest:</strong> ${packageName}</p>` : ''}
<hr />
<h3>Message:</h3>
<p>${message.replace(/\n/g, '<br />')}</p>
<hr />
<p style="color: #999; font-size: 12px;">This message was submitted via The 9ja Curator media kit at ${new Date().toISOString()}</p>
`;

    // Send the email via Resend
    const response = await resend.emails.send({
      from: 'The 9ja Curator <noreply@the9jacurator.com>',
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `Collaboration Inquiry: ${company} - ${category}`,
      html: emailContent,
    });

    if (response.error) {
      console.error('Resend error:', response.error);
      return {
        success: false,
        message: 'Failed to send email',
        error: response.error.message,
      };
    }

    return {
      success: true,
      message: `Your collaboration brief has been sent successfully. We will respond to ${email} within 2-3 business days.`,
    };
  } catch (error) {
    console.error('Server error sending collaboration brief:', error);
    return {
      success: false,
      message: 'An error occurred while sending your message',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
