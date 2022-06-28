import dotenv from 'dotenv'

dotenv.config()

interface AppEnv {
  readonly NODE_ENV: string
  readonly PORT: string
  readonly SECRET_KEY: string
  readonly SESS_MAX_AGE_IN_MINUTE: string
}

export class Environment {
  static readonly APP_ENV: AppEnv = {
    NODE_ENV: process.env.NODE_ENV!,
    PORT: process.env.PORT!,
    SECRET_KEY: process.env.SECRET_KEY!,
    SESS_MAX_AGE_IN_MINUTE: process.env.SESS_MAX_AGE_IN_MINUTE!,
  }

  static get IS_PRODUCTION(): boolean {
    return this.APP_ENV.NODE_ENV === 'production'
  }

  static get SESS_MAX_AGE_IN_SECOND(): number {
    return parseInt(this.APP_ENV.SESS_MAX_AGE_IN_MINUTE) * 60
  }

  static get SESS_MAX_AGE_IN_MILISECOND(): number {
    return parseInt(this.APP_ENV.SESS_MAX_AGE_IN_MINUTE) * 60 * 1000
  }

  private static throwEnvErrMsg = (msg: string): never => {
    throw new Error(`${msg} must be defined`)
  }

  static checkEnvVariables = (): void | never => {
    for (let key in this.APP_ENV) {
      if (!this.APP_ENV[key as keyof AppEnv]) {
        this.throwEnvErrMsg(key)
      }
    }
  }
}
