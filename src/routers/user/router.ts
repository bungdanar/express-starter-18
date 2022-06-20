import express from 'express'
import { UserController } from '../../controllers/user'
import { validateRequest } from '../../middlewares/validate-request'
import { UserValidator } from './validator'

const router = express.Router()

router.post(
  '/login',
  UserValidator.checkLoginPayload(),
  validateRequest,
  UserController.login
)

export { router as userRouter }
