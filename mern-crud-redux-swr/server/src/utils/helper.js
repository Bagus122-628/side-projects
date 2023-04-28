import { body, validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import User from "../models/user.schema.js"

export const auth = async (req, res, next) => {
  const accessToken = req.headers.token

  if (!accessToken) {
    return res.status(401).json({ error: "unauthorized user" })
  }

  try {
    const verifyToken = jwt.verify(accessToken, process.env.SECRET_KEY)
    const authenticateUser = await User.findById(verifyToken.id).exec()

    req.currentUser = authenticateUser
    req.currentUserId = authenticateUser._id
    req.isAdmin = authenticateUser.role === "admin"

    next()
  } catch (error) {
    res.status(400).json(error)
  }
}

export const validateCreateUser = [
  body("email")
    .notEmpty()
    .withMessage("email is requirer")
    .bail()
    .isEmail()
    .withMessage("invalid email address")
    .bail()
    .custom(async (email) => {
      const userIsExist = await User.exists({ email })
      if (userIsExist) {
        throw new Error("email already used")
      }
    }),

  body("name").notEmpty().withMessage("name is required"),
  body("password").notEmpty().withMessage("password is required"),
]

export const validateUpdateUser = [
  body("email", "email is requirer")
    .notEmpty()
    .bail()
    .isEmail()
    .withMessage("invalid email address"),
  body("name", "name is requirer").notEmpty(),
  body("role", "must be user or admin").isIn(["user", "admin"]),
]

export const validate = async (req, res, next) => {
  const result = validationResult(req)
  if (result.isEmpty()) {
    next()
  } else {
    res.status(400).json({ error: result.mapped() })
  }
}

export const validateId = async (req, res, next) => {
  const id = req.params.id
  try {
    const user = await User.findById(id).exec()
    req.user = user
    next()
  } catch (error) {
    res.status(303).json({ msg: "user not found" })
    console.error(error)
  }
}
