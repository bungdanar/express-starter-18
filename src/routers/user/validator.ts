import { body } from 'express-validator'
import { UserLoginPayload } from '../../data-types/user'

export class UserValidator {
  static checkLoginPayload = () => {
    const keys: (keyof UserLoginPayload)[] = ['username', 'password']

    return keys.map((k) => {
      switch (k) {
        case 'username':
        case 'password': {
          return body(k).notEmpty().isString().trim().escape()
        }

        default: {
          return k
        }
      }
    })
  }
}
