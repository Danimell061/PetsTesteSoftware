import { findAllUsers, registerUser, findUser, updateUser, findUserByToken, deleteUser } from "../controllers/user.controller.js";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
import { Router } from "express";
const router = Router()

router.post('/', registerUser)
router.get('/', authMiddleware, roleMiddleware, findAllUsers)
router.get('/findUserByTkn', authMiddleware, findUserByToken)
router.get('/:id', validId, validUser, findUser)
router.put("/:id", validId, validUser, authMiddleware, updateUser)
router.delete('/:id', validId, validUser, authMiddleware, deleteUser)

export default router