import { error, log } from "console"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import AuthRouter from "./src/routes/auth.route.js"
import UserRouter from "./src/routes/user.route.js"

dotenv.config()
const app = express()
const PORT = process.env.SERVER_PORT

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on("error", (e) => error(e))
db.once("open", () => log("connected to database"))

app.use(cors())
app.use(express.json())
app.use("/api", AuthRouter)
app.use("/api/user", UserRouter)

app.listen(PORT, () => log(`server is running on: http://localhost:${PORT}`))
