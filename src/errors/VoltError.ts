export class VoltError extends Error {
  public code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = 'VoltError';
    this.code = code;
    Object.setPrototypeOf(this, VoltError.prototype);
  }
}
