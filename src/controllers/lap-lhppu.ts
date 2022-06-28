import { Request, Response } from 'express'
import { LapLhppu } from '../models'

export class LapLhppuController {
  static getAll = async (req: Request, res: Response) => {
    const data = await LapLhppu.findAll({
      offset: 0,
      limit: 10,
      include: [{ association: LapLhppu.associations.lampiran }],
    })

    return res.status(200).send(data)
  }
}
