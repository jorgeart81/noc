import { createTransport } from 'nodemailer';
import { envs } from '../../config/plugins';

interface SendMailOptions {
  to: string;
  subject: string;
  htmlBody: string;
}

export class EmailService {
  private transporter = createTransport({
    host: envs.MAIL_HOST,
    port: envs.MAIL_PORT,
    secure: false,
    auth: {
      user: envs.MAIL_USERNAME,
      pass: envs.MAIL_PASSWORD,
    },
  });

  async sendEmail(mailOptions: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody } = mailOptions;

    try {
      const sentInformation = await this.transporter.sendMail({
        from: envs.MAIL_FROM_ADDRESS,
        to: to,
        subject: subject,
        html: htmlBody,
      });

      console.log({ sentInformation });

      return true;
    } catch (error) {
      return false;
    }
  }
}
