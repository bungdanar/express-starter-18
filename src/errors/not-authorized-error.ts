import { CustomError } from './custom-error'

export class NotAuthorizedError extends CustomError {
  readonly statusCode: number = 401

  constructor(readonly error: string = 'Not Authorized') {
    super(error)

    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }

  serializeError(): { message: string; statusCode: number } {
    return {
      message: this.error,
      statusCode: this.statusCode,
    }
  }
}
