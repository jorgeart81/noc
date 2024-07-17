import fs from 'fs';

import { LogDatasource } from '../../domain/datasources';
import { LogEntity, LogServerityLevel } from '../../domain/entities';

export enum LogPath {
  logPath = 'logs/',
  allLogsPath = 'logs/logs-low.log',
  mediumLogsPath = 'logs/logs-medium.log',
  highLogsPath = 'logs/logs-high.log',
}

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = LogPath.logPath;
  private readonly allLogsPath = LogPath.allLogsPath;
  private readonly mediumLogsPath = LogPath.mediumLogsPath;
  private readonly highLogsPath = LogPath.highLogsPath;

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles() {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;

        fs.writeFileSync(path, '');
      },
    );
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const { options } = newLog;
    const logAsJson = `${JSON.stringify(options)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (options.level === LogServerityLevel.low) return;

    if (options.level === LogServerityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }

  private getLogsFromFile(path: string): LogEntity[] {
    const content = fs.readFileSync(path, 'utf-8');
    const logs = content.split('\n').map(LogEntity.fromJson);
    return logs;
  }

  async getLogs(logServerityLevel: LogServerityLevel): Promise<LogEntity[]> {
    switch (logServerityLevel) {
      case LogServerityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);

      case LogServerityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);

      case LogServerityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);

      default:
        throw new Error(`${logServerityLevel} not implemented`);
    }
  }
}
