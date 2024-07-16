export enum LogServerityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export class LogEntity {
  public createdAt: Date;

  constructor(
    private readonly message: string,
    private readonly level: LogServerityLevel,
  ) {
    this.createdAt = new Date();
  }
}
