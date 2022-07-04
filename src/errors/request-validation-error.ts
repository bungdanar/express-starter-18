import { CustomError } from './custom-error'
import { ValidationError } from 'joi'

export class RequestValidationError extends CustomError {
  readonly statusCode: number = 400

  constructor(readonly error: ValidationError) {
    super('Invalid request parameters')

    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeError(): { message: string; statusCode: number } {
    return {
      message: this.error.details[0].message,
      statusCode: this.statusCode,
    }
  }
}
