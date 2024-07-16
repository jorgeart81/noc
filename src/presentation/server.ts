import { CheckService } from '../domain/use-cases';
import { CronService } from './cron/cron-service';

export class Server {
  static start() {
    console.log('Server started...');

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com';
      new CheckService(
        () => console.log(`${url} is ok`),
        (error) => console.error(error),
      ).execute(url);
    });
  }
}
