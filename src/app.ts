import express from 'express'
import 'express-async-errors'
import session, { SessionOptions } from 'express-session'
import { json } from 'body-parser'
import cors from 'cors'
import { errorHandler } from './middlewares/error-handler'
import { userRouter } from './routers/user/router'
import { Environment } from './utils/environment'
import { lapLhppuRouter } from './routers/lap-lhppu/router'

const app = express()

// Setup session options
const options: SessionOptions = {
  secret: Environment.APP_ENV.SECRET_KEY,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: Environment.SESS_MAX_AGE_IN_MILISECOND,
  },
  resave: false,
  saveUninitialized: false,
}

if (Environment.IS_PRODUCTION) {
  app.set('trust proxy', 1)
  options.cookie!.secure = true
}

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3005'],
  })
)
app.use(session(options))
app.use(json())

app.use('/api/user', userRouter)
app.use('/api/lapLhppu', lapLhppuRouter)

app.use(errorHandler)

export { app }
