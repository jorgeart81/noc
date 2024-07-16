import { LogEntity, LogServerityLevel } from '../../domain/entities';
import { LogRepository } from '../../domain/repository';
import { LogDatasource } from '../../domain/datasources/log.datasource';

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDatasource: LogDatasource) {}

  async saveLog(log: LogEntity): Promise<void> {
    this.logDatasource.saveLog(log);
  }

  async getLogs(logServerityLevel: LogServerityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(logServerityLevel);
  }
}
