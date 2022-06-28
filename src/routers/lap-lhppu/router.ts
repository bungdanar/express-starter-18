import express from 'express'
import { LapLhppuController } from '../../controllers/lap-lhppu'

const router = express.Router()

router.get('/', LapLhppuController.getAll)

export { router as lapLhppuRouter }
