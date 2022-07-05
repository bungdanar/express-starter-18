import Joi from 'joi'
import validator from 'validator'
import { QueryOperator } from '../data-types/model-query'

export class CustomJoi {
  static escapeHtml = (value: any) => validator.escape(value)

  private static sortPattern = Joi.string().pattern(
    /:(ASC|DESC)$/,
    'ends with :ASC or :DESC'
  )

  static sortQueryValidation() {
    return Joi.alternatives().try(
      this.sortPattern,
      Joi.array().items(this.sortPattern)
    )
  }

  static limitQueryValidation() {
    return Joi.number().integer().min(0).max(1000)
  }

  static offsetQueryValidation() {
    return Joi.number().integer().min(0)
  }

  static intQueryValidation() {
    return this.queryOperatorValidation(Joi.number().integer())
  }

  static stringQueryValidation() {
    return this.queryOperatorValidation(
      Joi.string().trim().custom(this.escapeHtml)
    )
  }

  static dateQueryValidation() {
    return this.queryOperatorValidation(Joi.date().iso())
  }

  static queryOperatorValidation<T>(validator: Joi.SchemaLike) {
    return Joi.object<QueryOperator<T>>({
      eq: validator,
      lt: validator,
      lte: validator,
      gt: validator,
      gte: validator,
      ne: validator,
      in: Joi.alternatives().try(Joi.array().items(validator), validator),
      nin: Joi.alternatives().try(Joi.array().items(validator), validator),
      contains: validator,
      startsWith: validator,
    })
      .min(1)
      .max(1)
  }
}
