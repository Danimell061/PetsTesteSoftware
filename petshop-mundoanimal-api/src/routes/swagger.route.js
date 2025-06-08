import { Router } from 'express'
const router = Router()

import swaggerUi from 'swagger-ui-express'
import { readFile } from 'fs/promises'
const data = await readFile(new URL('../swagger.json', import.meta.url))
const swaggerDocument = JSON.parse(data)

router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(swaggerDocument))

export default router