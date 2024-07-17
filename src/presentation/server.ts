import { CheckService } from '../domain/use-cases';
import { FileSystemDatasource } from '../infrastructure/datasources';
import { LogRepositoryImpl } from '../infrastructure/repositories';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';

const logDatasource = new FileSystemDatasource();
const logRepository = new LogRepositoryImpl(logDatasource);

export class Server {
  static start() {
    console.log('Server started...');

    const emailService = new EmailService();
    emailService.sendEmail({
      to: 'dev@gmail.com',
      subject: 'Logs system',
      htmlBody: `
      <h2>Logs system</h2>
      <p>Officia officia consequat exercitation ad magna occaecat nostrud esse velit non ut cillum. Cillum et velit ipsum sint in minim. Occaecat commodo sint reprehenderit ea veniam irure voluptate. Anim sit occaecat esse culpa cupidatat enim fugiat excepteur eu ea eu laboris exercitation. Magna incididunt culpa incididunt quis nulla anim do elit aliquip culpa dolor pariatur elit. Laboris excepteur deserunt fugiat incididunt amet commodo in quis reprehenderit nulla do duis in.</p>
      <p>See attached logs</p>
      `,
    });

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
