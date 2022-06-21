import { JwtPayload } from 'jsonwebtoken'
import { CurrentUser } from '../../data-types/user'

declare global {
  namespace Express {
    interface Request {
      jwtPayload?: JwtPayload
      currentUser?: CurrentUser
    }
  }
}
