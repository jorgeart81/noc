export enum LogServerityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  public createdAt: Date;

  constructor(readonly message: string, readonly level: LogServerityLevel) {
    this.createdAt = new Date();
  }

  static fromJson(json: string): LogEntity {
    const { message, level, createdAt } = JSON.parse(json);
    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt);

    return log;
  }
}
