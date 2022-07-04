import Joi from 'joi'
import { LapLhppuAttributes } from '../../models'
import { CustomJoi } from '../../utils/custom-joi'

type LapLhppuQUery = Partial<LapLhppuAttributes> & {
  isSent?: boolean
}

export class LapLhppuValidator {
  static validateQuery = (query: LapLhppuQUery) => {
    const schema = Joi.object<LapLhppuQUery>({
      id: Joi.number().integer(),
      bln_akhir: Joi.number().integer(),
      kode_satker_uki: Joi.string().trim().custom(CustomJoi.escapeHtml),
      status: Joi.string(),
      info_tambahan: Joi.string(),
      tahun: Joi.number().integer(),
      createdAt: Joi.date().iso(),
      updatedAt: Joi.date().iso(),
      isSent: Joi.boolean(),
    })

    return schema.validate(query)
  }
}
