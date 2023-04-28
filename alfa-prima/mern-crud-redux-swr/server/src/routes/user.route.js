import { Router } from "express"
import {
  createUser,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js"
import {
  validateId,
  auth,
  validateCreateUser,
  validate,
  validateUpdateUser,
} from "../utils/helper.js"

const router = Router()

router.post("/", auth, validateCreateUser, validate, createUser)
router.get("/:id", validateId, getUserById)
router.get("/", getAllUser)
router.patch("/:id", auth, validateId, validateUpdateUser, validate, updateUser)
router.delete("/:id", auth, validateId, deleteUser)

export default router
