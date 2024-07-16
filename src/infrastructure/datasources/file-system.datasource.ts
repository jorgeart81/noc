import fs from 'fs';

import { LogDatasource } from '../../domain/datasources';
import { LogEntity, LogServerityLevel } from '../../domain/entities';

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/logs-low.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath = 'logs/logs-high.log';

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
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (newLog.level === LogServerityLevel.low) return;

    if (newLog.level === LogServerityLevel.medium) {
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
