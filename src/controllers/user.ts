import { Request, Response } from 'express'
import { UserLoginPayload } from '../data-types/user'

export class UserController {
  static login = async (
    req: Request<any, any, UserLoginPayload>,
    res: Response
  ) => {
    const { username, password } = req.body

    return res.status(200).send({
      username,
      password,
    })
  }
}
