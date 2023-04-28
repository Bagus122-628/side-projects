import axios from "axios"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setContext } from "../../app/context"
import Input from "../../components/input"
import { useNavigate } from "react-router-dom"
import { local } from "../../app/local-store"

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const email = useRef("")
  const password = useRef("")

  const handelSummit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("http://localhost:8080/api/login", {
        email: email.current,
        password: password.current,
      })
      const user = data.data
      dispatch(setContext(user))
      local.set("token", user.token)
      navigate("/")
    } catch (error) {
      setError(error.response.data.error)
    }
  }

  return (
    <div className='flex flex-1 '>
      <form
        method='post'
        onSubmit={(e) => handelSummit(e)}
        className='border rounded py-4 px-3 w-max m-auto shadow-md flex flex-col'
      >
        <h2 className='font-bold text-2xl text-slate-700 m-3'>Login</h2>
        {error && <p className='text-pink-700 mx-3'>{error}</p>}
        <Input
          name='email'
          type='email'
          placeholder='john@gmail.com'
          onChange={(e) => (email.current = e.target.value)}
          error={error["email"]}
        />
        <Input
          name='password'
          type='password'
          onChange={(e) => (password.current = e.target.value)}
          error={error["password"]}
        />
        <button className='box-border m-3 w-auto  py-1 rounded text-white font-bold bg-green-500  hover:bg-green-700'>
          Login
        </button>
      </form>
    </div>
  )
}
