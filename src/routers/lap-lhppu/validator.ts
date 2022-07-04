import Joi from 'joi'
import { ModelQueryWithPagination } from '../../data-types/model-query'
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

  static validateQueryExtended = (
    query: ModelQueryWithPagination<LapLhppuAttributes>
  ) => {
    const intQuerySchema = () =>
      CustomJoi.queryOperatorValidation(Joi.number().integer())

    const stringQuerySchema = () =>
      CustomJoi.queryOperatorValidation(
        Joi.string().trim().custom(CustomJoi.escapeHtml)
      )

    const dateQuerySchema = () =>
      CustomJoi.queryOperatorValidation(Joi.date().iso())

    const schema = Joi.object<ModelQueryWithPagination<LapLhppuAttributes>>({
      id: intQuerySchema(),
      bln_akhir: intQuerySchema(),
      kode_satker_uki: stringQuerySchema(),
      status: stringQuerySchema(),
      info_tambahan: stringQuerySchema(),
      tahun: intQuerySchema(),
      createdAt: dateQuerySchema(),
      updatedAt: dateQuerySchema(),
      limit: CustomJoi.limitValidation(),
      offset: CustomJoi.offsetValidation(),
      sort: CustomJoi.sortValidation(),
    })

    return schema.validate(query)
  }
}
