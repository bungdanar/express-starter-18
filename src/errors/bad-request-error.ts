import { CustomError } from './custom-error'

export class BadRequestError extends CustomError {
  readonly statusCode: number = 400

  constructor(readonly error: string = 'Bad Request') {
    super(error)

    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeError(): { message: string; statusCode: number } {
    return {
      message: this.error,
      statusCode: this.statusCode,
    }
  }
}
