import express from 'express'
import 'express-async-errors'
import session, { SessionOptions } from 'express-session'
import { Environment } from './utils/environment'

const app = express()

// Setup session options
const options: SessionOptions = {
  secret: Environment.APP_ENV.SECRET_KEY,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  resave: false,
  saveUninitialized: false,
}

if (Environment.IS_PRODUCTION) {
  app.set('trust proxy', 1)
  options.cookie!.secure = true
}

app.use(session(options))

export { app }
