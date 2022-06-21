import { Request, Response, NextFunction } from 'express'

// Must be called after requireToken middleware
export const requireCurrentuser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Fetch user from database
  // ...

  // Assign user to request object
  req.currentUser = {
    userId: req.jwtPayload!.userId as number,
    username: 'bungdanar',
  }

  next()
}
