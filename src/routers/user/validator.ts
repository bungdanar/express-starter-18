import Joi from 'joi'
import { UserLoginPayload } from '../../data-types/user'
import { CustomJoi } from '../../utils/custom-joi'

export class UserValidator {
  static validateLoginPayload = (payload: UserLoginPayload) => {
    const schema = Joi.object<UserLoginPayload>({
      username: Joi.string().trim().required().custom(CustomJoi.escapeHtml),
      password: Joi.string().trim().required().custom(CustomJoi.escapeHtml),
    })

    return schema.validate(payload)
  }
}
