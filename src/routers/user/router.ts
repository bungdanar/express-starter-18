import express from 'express'
import { UserController } from '../../controllers/user'
import { requireCurrentuser } from '../../middlewares/require-current-user'
import { requireToken } from '../../middlewares/require-token'
import { validateRequest } from '../../middlewares/validate-request'
import { UserValidator } from './validator'

const router = express.Router()

router.post(
  '/login',
  UserValidator.checkLoginPayload(),
  validateRequest,
  UserController.login
)

router.post('/logout', [requireToken], UserController.logout)

router.get(
  '/currentUser',
  [requireToken, requireCurrentuser],
  UserController.getCurrentUser
)

export { router as userRouter }
