import axios from "axios"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { setContext } from "../app/context"
import { local } from "../app/local-store"
import Navbar from "../components/navbar"

export default function Root() {
  const token = local.get("token")
  const dispatch = useDispatch()

  const hooks = async (token) => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/me", {
        headers: { token },
      })
      dispatch(setContext(data))
    } catch (error) {
      console.log(error)
    }
  }

  if (token) {
    hooks(token)
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
