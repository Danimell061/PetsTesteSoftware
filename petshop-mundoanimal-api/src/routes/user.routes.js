import { findAllUsers, registerUser, findUser, updateUser } from "../controllers/user.controller.js";
import { validId, validUser } from "../middlewares/global.middlewares.js";
import { Router } from "express";
const router = Router()

router.post('/', registerUser)
router.get('/', findAllUsers)
router.get('/:id', validId, validUser, findUser)
router.put("/:id", validId, validUser, updateUser)

export default router