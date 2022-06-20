import { Request, Response } from 'express'

export class UserController {
  static login = async (req: Request, res: Response) => {
    return res.status(200).send({
      username: req.body.username,
      password: req.body.password,
    })
  }
}
