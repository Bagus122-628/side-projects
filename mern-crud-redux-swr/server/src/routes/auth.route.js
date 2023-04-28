import { Router } from "express"
import { getProfile, login, register } from "../controllers/auth.controller.js"
import { auth, validate, validateCreateUser } from "../utils/helper.js"

const router = Router()

router.post("/login", login)
router.post("/registration", validateCreateUser, validate, register)
router.get("/me", auth, getProfile)

export default router
