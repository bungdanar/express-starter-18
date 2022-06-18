import { Environment } from './utils/environment'

const start = async () => {
  try {
    Environment.checkEnvVariables()

    console.log(`App has been lifted at ${new Date()}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
