import dotenv from 'dotenv'

dotenv.config()

interface AppEnv {
  readonly NODE_ENV: string | undefined
  readonly PORT: string | undefined
}

export class Environment {
  static readonly APP_ENV: AppEnv = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
  }

  static get IS_PRODUCTION(): boolean {
    return this.APP_ENV.NODE_ENV === 'production'
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