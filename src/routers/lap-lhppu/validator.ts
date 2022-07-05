import Joi from 'joi'
import { ModelQueryWithPagination } from '../../data-types/model-query'
import { LapLhppuAttributes } from '../../models'
import { CustomJoi } from '../../utils/custom-joi'

export class LapLhppuValidator {
  static validateQuery = (
    query: ModelQueryWithPagination<LapLhppuAttributes>
  ) => {
    const schema = Joi.object<ModelQueryWithPagination<LapLhppuAttributes>>({
      id: CustomJoi.intQueryValidation(),
      bln_akhir: CustomJoi.intQueryValidation(),
      kode_satker_uki: CustomJoi.stringQueryValidation(),
      status: CustomJoi.stringQueryValidation(),
      info_tambahan: CustomJoi.stringQueryValidation(),
      tahun: CustomJoi.intQueryValidation(),
      createdAt: CustomJoi.dateQueryValidation(),
      updatedAt: CustomJoi.dateQueryValidation(),
      limit: CustomJoi.limitQueryValidation(),
      offset: CustomJoi.offsetQueryValidation(),
      sort: CustomJoi.sortQueryValidation(),
    })

    return schema.validate(query)
  }
}
