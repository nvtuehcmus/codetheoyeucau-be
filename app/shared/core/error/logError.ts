type LogErrorType = 'LOGIC' | 'INTERNAL' | 'INTEGRATION' | 'AUTHENTICATION' | 'AUTHORISATION';

export class LogError implements Error {
  public name: LogErrorType;
  public message: string;
  public fields?: object;
  public stack?: string;
  public reason?: any;

  constructor(error: string | Error, name: LogErrorType = 'INTERNAL', fields?: object, stack?: string, reason?: any) {
    let errorStr = '';
    if (typeof error === typeof Error) {
      errorStr = (error as Error).message;
    } else {
      errorStr = error as string;
    }

    this.name = name;
    this.message = errorStr;
    this.fields = fields;
    this.stack = stack;
    this.reason = reason;
  }
}
