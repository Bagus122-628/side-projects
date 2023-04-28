import { useRef, useState } from "react"
import Input from "../../components/input"
import axios from "axios"
import { local } from "../../app/local-store"
import { useNavigate } from "react-router-dom"

export default function AddUser() {
  const navigate = useNavigate()
  const [error, setError] = useState()
  const name = useRef()
  const email = useRef()
  const password = useRef()
  const token = local.get("token")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user",
        {
          name: name.current,
          email: email.current,
          password: password.current,
        },
        { headers: { token } }
      )
      console.log(response)
      navigate("/")
    } catch (error) {
      setError(error.response.data.error)
    }
  }

  return (
    <div className='flex flex-1 '>
      <form
        onSubmit={handleSubmit}
        className='border rounded py-4 px-3 w-max m-auto shadow-md flex flex-col'
      >
        <h2 className='font-bold text-2xl text-slate-700 m-3'>
          Create New User
        </h2>

        <Input
          name='name'
          type='text'
          placeholder='john smit'
          onChange={(e) => (name.current = e.target.value)}
          error={error?.name}
        />
        <Input
          name='email'
          type='email'
          placeholder='john@gmail.com'
          onChange={(e) => (email.current = e.target.value)}
          error={error?.email}
        />
        <Input
          name='password'
          type='password'
          onChange={(e) => (password.current = e.target.value)}
          error={error?.password}
        />
        <button className='box-border m-3 w-auto  py-1 rounded text-white font-bold bg-green-500  hover:bg-green-700'>
          Create
        </button>
      </form>
    </div>
  )
}
