import { LogEntity, LogServerityLevel } from '../../entities';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback?: SuccessCallback,
    private readonly errorCallback?: ErrorCallback,
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`error on check service ${url}`);
      }

      const log = new LogEntity(
        `service ${url} working`,
        LogServerityLevel.low,
      );
      this.logRepository.saveLog(log);
      if (this.successCallback) this.successCallback();

      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok ${error}`;
      
      const log = new LogEntity(errorMessage, LogServerityLevel.high);
      this.logRepository.saveLog(log);
      if (this.errorCallback) this.errorCallback(errorMessage);

      return false;
    }
  }
}
