import express from 'express'
import { LapLhppuController } from './controller'

const router = express.Router()

router.get('/', LapLhppuController.getAll)

export { router as lapLhppuRouter }
