import { Request, Response } from 'express'
import {
  // LapLhppu,
  LapLhppuAttributes,
} from '../models'
import { LapLhppuValidator } from '../routers/lap-lhppu/validator'

export class LapLhppuController {
  static getAll = async (
    req: Request<any, any, any, Partial<LapLhppuAttributes>>,
    res: Response
  ) => {
    const { error, value } = LapLhppuValidator.validateQuery(req.query)
    if (error) return res.status(400).send(error.details[0].message)

    // LapLhppuValidator.sanitizeQuery(req.query)

    return res.status(200).send(value)

    // const data = await LapLhppu.findAll({
    //   offset: 0,
    //   limit: 10,
    //   include: [{ association: LapLhppu.associations.lampiran }],
    // })

    // return res.status(200).send(data)
  }
}
