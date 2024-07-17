import { LogEntity, LogServerityLevel } from '../../entities';
import { IEmailService } from '../../interfaces';
import { LogRepository } from '../../repository';

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  private readonly currentOrigin = 'send-email-logs';

  constructor(
    private readonly emailService: IEmailService,
    private readonly logRepository: LogRepository,
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmialWithFileSystemLogs(to);
      if (!sent) throw new Error('email log not sent');

      const log = new LogEntity({
        message: `Log email sent`,
        level: LogServerityLevel.low,
        origin: this.currentOrigin,
      });
      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogServerityLevel.high,
        origin: this.currentOrigin,
      });
      this.logRepository.saveLog(log);

      return false;
    }
  }
}
