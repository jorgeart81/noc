import { CheckService } from '../domain/use-cases';
import { FileSystemDatasource } from '../infrastructure/datasources';
import { LogRepositoryImpl } from '../infrastructure/repositories';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { envs } from '../config/plugins';

const logDatasource = new FileSystemDatasource();
const logRepository = new LogRepositoryImpl(logDatasource);
const emailService = new EmailService({
  host: envs.MAIL_HOST,
  port: envs.MAIL_PORT,
  secure: false,
  user: envs.MAIL_USERNAME,
  pass: envs.MAIL_PASSWORD,
});

export class Server {
  static start() {
    console.log('Server started...');

    const sendEmailLogs = new SendEmailLogs(emailService, logRepository);
    sendEmailLogs.execute(['dev@gmail.com', 'test@gmail.com']);

    // const emailService = new EmailService();
    // emailService.sendEmialWithFileSystemLogs(['dev@gmail.com']);

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com';
    //   new CheckService(
    //     logRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.error(error),
    //   ).execute(url);
    // });
  }
}
