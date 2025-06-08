import { findAllUsers, registerUser, findUser, updateUser } from "../controllers/user.controller.js";
import { authMiddleware, roleMiddleware } from "../middlewares/auth.middleware.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
import { Router } from "express";
const router = Router()

router.post('/', registerUser)
router.get('/', authMiddleware, roleMiddleware, findAllUsers)
router.get('/:id', validId, validUser, findUser)
router.put("/:id", validId, validUser, authMiddleware, updateUser)

export default router