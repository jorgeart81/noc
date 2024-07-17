export interface IEmailService {
  sendEmail(mailOptions: SendMailOptions): Promise<boolean>;
  sendEmialWithFileSystemLogs(to: string | string[]): Promise<boolean>;
}

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}
