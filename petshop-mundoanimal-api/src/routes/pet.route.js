import { Router } from 'express'
import { findAllPets, registerPet } from '../controllers/pet.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()
router.post('/', authMiddleware, registerPet)
router.get('/', findAllPets)
export default router