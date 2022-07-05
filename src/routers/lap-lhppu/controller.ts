import { Request, Response } from 'express'
import { RequestValidationError } from '../../errors/request-validation-error'
import { LapLhppu } from '../../models'
import { QueryBuilder } from '../../utils/query-builder'
import { LapLhppuValidator } from './validator'

export class LapLhppuController {
  static getAll = async (req: Request, res: Response) => {
    const { error, value } = LapLhppuValidator.validateQuery(req.query)
    if (error) throw new RequestValidationError(error)

    const { offset, limit, sort, ...query } = value

    const data = await LapLhppu.findAll({
      offset: QueryBuilder.buildOffsetQuery(offset),
      limit: QueryBuilder.buildLimitQuery(limit),
      order: QueryBuilder.buildOrderQuery(sort),
      where: QueryBuilder.buildWhereQueryAuto(query),
      // include: [{ association: LapLhppu.associations.lampiran }],
    })

    return res.status(200).send(data)
  }
}
