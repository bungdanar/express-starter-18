import { Request } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Environment } from './environment'

type JwtSigningPayload = {
  userId: number | string
}

export class Authentication {
  private static generateToken = (data: JwtSigningPayload) => {
    return jwt.sign(data, Environment.APP_ENV.SECRET_KEY, {
      expiresIn: Environment.SESS_MAX_AGE_IN_SECOND,
    })
  }

  private static saveSessionAsync = (req: Request) => {
    return new Promise<void>((resolve, reject) => {
      req.session.save((err) => {
        if (err) return reject(err)

        resolve()
      })
    })
  }

  static regenerateSessionWithTokenAsync = (
    req: Request,
    data: JwtSigningPayload
  ) => {
    const token = this.generateToken(data)

    return new Promise<void>((resolve, reject) => {
      req.session.regenerate(async (err) => {
        if (err) return reject(err)

        req.session.token = token

        try {
          await this.saveSessionAsync(req)
          resolve()
        } catch (savingErr) {
          reject(savingErr)
        }
      })
    })
  }

  static verifyToken = (token: string) => {
    return jwt.verify(token, Environment.APP_ENV.SECRET_KEY) as JwtPayload
  }
}
