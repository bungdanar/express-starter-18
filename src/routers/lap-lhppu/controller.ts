import { Request, Response } from 'express'
import { RequestValidationError } from '../../errors/request-validation-error'
import {
  // LapLhppu,
  LapLhppuAttributes,
} from '../../models'
import { LapLhppuValidator } from './validator'

export class LapLhppuController {
  static getAll = async (req: Request, res: Response) => {
    const { error, value } = LapLhppuValidator.validateQueryExtended(req.query)
    if (error) throw new RequestValidationError(error)

    return res.status(200).send(value)

    // const data = await LapLhppu.findAll({
    //   offset: 0,
    //   limit: 10,
    //   include: [{ association: LapLhppu.associations.lampiran }],
    // })

    // return res.status(200).send(data)
  }
}
