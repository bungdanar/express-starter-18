import { Request, Response } from 'express'
import { UserLoginPayload } from '../data-types/user'
import { BadRequestError } from '../errors/bad-request-error'
import { Authentication } from '../utils/authentication'

export class UserController {
  static login = async (
    req: Request<any, any, UserLoginPayload>,
    res: Response
  ) => {
    const {
      username,
      //  password
    } = req.body

    if (username.trim() !== 'bungdanar') {
      throw new BadRequestError('username or password is wrong')
    }

    const userData = {
      userId: 1,
      username: 'bungdanar',
    }

    await Authentication.setTokenToSession(req, {
      userId: userData.userId,
    })

    return res.status(200).send(userData)
  }

  static getCurrentUser = async (req: Request, res: Response) => {
    return res.status(200).send(req.currentUser)
  }

  static logout = async (req: Request, res: Response) => {
    await Authentication.removeTokenFromSession(req)
    return res.status(200).send({})
  }
}
