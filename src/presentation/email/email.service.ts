import { createTransport } from 'nodemailer';

import { envs } from '../../config/plugins';
import { LogPath } from '../../infrastructure/datasources';
import type {
  Attachement,
  IEmailService,
  SendMailOptions,
} from '../../domain/interfaces';

export class EmailService implements IEmailService {
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
    const { to, subject, htmlBody, attachements = [] } = mailOptions;

    try {
      const sentInformation = await this.transporter.sendMail({
        from: envs.MAIL_FROM_ADDRESS,
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachements,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmialWithFileSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = 'Server logs';
    const htmlBody =
      'Eiusmod non reprehenderit ipsum magna laborum consectetur nulla sunt nostrud do nisi deserunt reprehenderit est. Sint ipsum fugiat nulla duis consectetur exercitation elit occaecat. Ullamco excepteur enim laborum laborum Lorem reprehenderit nisi mollit minim veniam minim excepteur sint anim.';

    const attachements: Attachement[] = [
      { filename: 'logs-all.log', path: `./${LogPath.allLogsPath}` },
      { filename: 'logs-medium.log', path: `./${LogPath.mediumLogsPath}` },
      { filename: 'logs-high.log', path: `./${LogPath.highLogsPath}` },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachements });
  }
}
