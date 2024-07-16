import { LogEntity, LogServerityLevel } from '../entities';

export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(logServerityLevel: LogServerityLevel): Promise<LogEntity[]>;
}
