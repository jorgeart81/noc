import { CheckService } from '../domain/use-cases';
import { FileSystemDatasource } from '../infrastructure/datasources';
import { LogRepositoryImpl } from '../infrastructure/repositories';
import { CronService } from './cron/cron-service';

const logDatasource = new FileSystemDatasource();
const logRepository = new LogRepositoryImpl(logDatasource);

export class Server {
  static start() {
    console.log('Server started...');

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com';
      new CheckService(
        logRepository,
        () => console.log(`${url} is ok`),
        (error) => console.error(error),
      ).execute(url);
    });
  }
}
