import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.schema.js"

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email }).exec()
    if (!user) return res.status(400).json({ error: "user doesn't exist" })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ error: "wrong credential" })

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
    const { name, role, _id } = user

    return res
      .status(200)
      .json({ data: { id: _id, token, name, email: user.email, role } })
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const hashPassword = await bcrypt.hash(password, 10)
    const data = await User.create({ name, email, password: hashPassword })

    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const getProfile = async (req, res) => {
  return res.status(200).json(req.currentUser)
}
