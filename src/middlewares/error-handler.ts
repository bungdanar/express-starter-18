import { Request, Response } from 'express'
import { getErrorMessage } from '../utils/get-err-message'

export const errorHandler = (err: unknown, req: Request, res: Response) => {
  // Should be checked againts custom errors
  // ...

  // Pass all custom errors
  // Should log to logging service
  console.error(getErrorMessage(err))

  return res.status(500).send({
    message: 'Internal Server Error',
    statusCode: 500,
  })
}
