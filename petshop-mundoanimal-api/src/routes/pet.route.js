import { Router } from 'express'
import { findAllPets, registerPet, findPet, findUserPets, updatePet, deletePet } from '../controllers/pet.controller.js'
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js'
import { validId, validPet } from '../middlewares/global.middlewares.js'

const router = Router()


router.post('/', authMiddleware, registerPet)
router.get('/', authMiddleware, roleMiddleware, findAllPets)
router.get('/byUser/', authMiddleware, findUserPets)
router.get('/:id', validId, validPet, authMiddleware, findPet)
router.put('/:id', validId, validPet, authMiddleware, updatePet)
router.delete('/:id', validId, validPet, authMiddleware, deletePet)

export default router