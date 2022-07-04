import { Request, Response } from 'express'
import { CurrentUser, UserLoginPayload } from '../data-types/user'
import { BadRequestError } from '../errors/bad-request-error'
import { RequestValidationError } from '../errors/request-validation-error'
import { UserValidator } from '../routers/user/validator'
import { Authentication } from '../utils/authentication'

export class UserController {
  static login = async (
    req: Request<any, any, UserLoginPayload>,
    res: Response<CurrentUser>
  ) => {
    const { error, value: loginPayload } = UserValidator.validateLoginPayload(
      req.body
    )

    if (error) throw new RequestValidationError(error)

    const {
      username,
      //  password
    } = loginPayload

    if (username !== 'bungdanar') {
      throw new BadRequestError('username or password is wrong')
    }

    const userData = {
      userId: 1,
      username: 'bungdanar',
    }

    await Authentication.setTokenToSession(req, {
      userId: userData.userId,
    })

    return res.status(200).send({
      ...userData,
      exp: Authentication.expInSecond,
    })
  }

  static getCurrentUser = async (req: Request, res: Response) => {
    return res.status(200).send(req.currentUser)
  }

  static logout = async (req: Request, res: Response) => {
    await Authentication.removeTokenFromSession(req)
    return res.status(200).send({})
  }
}
