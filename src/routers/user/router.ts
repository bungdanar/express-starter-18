import express from 'express'
import { UserController } from '../../controllers/user'
import { requireCurrentuser } from '../../middlewares/require-current-user'
import { requireToken } from '../../middlewares/require-token'

const router = express.Router()

router.post('/login', UserController.login)
router.post('/logout', [requireToken], UserController.logout)

router.get(
  '/currentUser',
  [requireToken, requireCurrentuser],
  UserController.getCurrentUser
)

export { router as userRouter }
