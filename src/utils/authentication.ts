import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { Environment } from './environment'

export class Authentication {
  private static generateToken = (data: object) => {
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

  static regenerateSessionWithTokenAsync = (req: Request, data: object) => {
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
}
