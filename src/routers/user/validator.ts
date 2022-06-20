import { body } from 'express-validator'

export class UserValidator {
  static checkLoginPayload = () => {
    return [
      body('username').isString().trim().notEmpty(),
      body('password').isString().trim().notEmpty(),
    ]
  }
}
