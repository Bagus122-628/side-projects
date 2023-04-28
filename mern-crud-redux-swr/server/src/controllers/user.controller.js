import User from "../models/user.schema.js"
import bcrypt from "bcrypt"

export const createUser = async (req, res) => {
  const { name, email, password } = req.body
  if (!req.isAdmin) return res.status(304).json({ msg: "dont have permission" })

  try {
    const hashPassword = await bcrypt.hash(password, 10)
    const data = await User.create({ name, email, password: hashPassword })

    res.status(200).json({ msg: "success create new user ", data })
  } catch (error) {
    res.status(400).json(error)
  }
}

export const getUserById = async (req, res) => {
  return res.status(200).json(req.user)
}

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find()

    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}

export const updateUser = async (req, res) => {
  const { name, email, password, role } = req.body
  if (!req.isAdmin)
    return res.status(304).json({ msg: "don't have permission" })
  try {
    const data = req.user

    if (name) data.name = name

    if (email !== data.email) {
      const existEmail = await User.findOne({ email }).exec()
      if (existEmail) return res.status(400).json("email already used")
      data.email = email
    }

    if (role) data.role = role
    if (password) data.password = await bcrypt.hash(password, 10)

    await data.save()

    return res.status(200).json({ msg: "successfully update user", data })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

export const deleteUser = async (req, res) => {
  if (!req.isAdmin) return res.status(304).json({ msg: "dont have permission" })
  try {
    const id = req.params.id
    const data = await User.findByIdAndDelete(id)

    return res.json({ msg: "successfully delete user", data })
  } catch (error) {
    return res.status(400).json({ error })
  }
}
