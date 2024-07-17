export enum LogServerityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {
  message: string;
  level: LogServerityLevel;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  constructor(readonly options: LogEntityOptions) {
    options.createdAt = new Date();
  }

  static fromJson(json: string): LogEntity {
    const { message, level, origin, createdAt } = JSON.parse(json);

    return new LogEntity({
      message,
      level,
      origin,
      createdAt: new Date(createdAt),
    });
  }
}
