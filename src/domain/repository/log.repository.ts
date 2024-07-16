import { LogEntity, LogServerityLevel } from '../entities';

export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(logServerityLevel: LogServerityLevel): Promise<LogEntity[]>;
}
