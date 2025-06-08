import { Router } from 'express'
import { findAllPets, registerPet, findPet, findUserPets } from '../controllers/pet.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { validId, validPet } from '../middlewares/global.middlewares.js'

const router = Router()


router.post('/', authMiddleware, registerPet)
router.get('/', findAllPets)
router.get('/byUser/', authMiddleware, findUserPets)
router.get('/:id', validId, validPet, authMiddleware, findPet)



export default router