import { Request, Response, NextFunction } from 'express'
import { NotAuthorizedError } from '../errors/not-authorized-error'
import { Authentication } from '../utils/authentication'

export const requireToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.session.token || req.headers.authorization

  if (!token) {
    throw new NotAuthorizedError()
  }

  try {
    const payload = Authentication.verifyToken(token)

    req.jwtPayload = payload
    next()
  } catch (error) {
    throw new NotAuthorizedError()
  }
}
