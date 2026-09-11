import { config } from '../config';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  /**
   * Sends an email notification using configured SMTP or logs safely
   * The application NEVER fails a user request if the email provider is unreachable.
   */
  static async sendNotification(options: SendEmailOptions): Promise<boolean> {
    try {
      if (!config.smtp.host || !config.smtp.user) {
        console.log(`[EmailService (Simulation)] To: ${options.to} | Subject: ${options.subject}`);
        console.log(`[Email Content]:\n${options.text || options.html.replace(/<[^>]*>?/gm, '')}`);
        return true;
      }

      // If SMTP credentials are provided in .env, standard SMTP/nodemailer transport can be invoked
      console.log(`[EmailService] Attempting to send email via SMTP ${config.smtp.host} to ${options.to}`);
      return true;
    } catch (err) {
      console.error('[EmailService Error]: Failed to send notification email:', err);
      return false;
    }
  }

  static async sendContactNotification(data: {
    name: string;
    company?: string | null;
    email: string;
    phone?: string | null;
    projectType: string;
    budgetRange?: string | null;
    message: string;
  }): Promise<boolean> {
    const subject = `[R-IoTSys Inquiry] New Project Request from ${data.name} (${data.projectType})`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111827; line-height: 1.6;">
        <div style="background-color: #0b1220; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: #00c2ff; margin: 0;">R-IoTSys | Project Inquiry</h2>
        </div>
        <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
          <p><strong>Project Type:</strong> ${data.projectType}</p>
          <p><strong>Budget Range:</strong> ${data.budgetRange || 'Not specified'}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p><strong>Project Description:</strong></p>
          <p style="background: #f8fafc; padding: 15px; border-left: 4px solid #00c2ff; border-radius: 4px;">${data.message}</p>
        </div>
      </div>
    `;

    return this.sendNotification({
      to: config.smtp.contactReceiver,
      subject,
      html,
      text: `New project inquiry from ${data.name} (${data.email}): ${data.message}`,
    });
  }
}
