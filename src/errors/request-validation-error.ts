import { CustomError } from './custom-error'
import { ValidationError } from 'express-validator'

export class RequestValidationError extends CustomError {
  readonly statusCode: number = 400

  constructor(readonly error: ValidationError[]) {
    super('Invalid request parameters')

    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeError(): { message: string; statusCode: number } {
    const { location, param, msg } = this.error[0]
    const message = `${location}[${param}]: ${msg}`

    return {
      message,
      statusCode: this.statusCode,
    }
  }
}
