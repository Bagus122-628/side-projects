import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Input from "../../components/input"
import { local } from "../../app/local-store"

export default function EditUser() {
  const navigate = useNavigate()
  const [error, setError] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [role, setRole] = useState()
  const { id } = useParams()
  const token = local.get("token")

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("http://localhost:8080/api/user/" + id)
      setName(data.name)
      setEmail(data.email)
      setRole(data.role)
    }
    getUser()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(
        "http://localhost:8080/api/user/" + id,
        {
          name: name,
          email: email,
          role: role,
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
        <h2 className='font-bold text-2xl text-slate-700 m-3'>Update User</h2>
        <Input
          name='name'
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={name}
          error={error?.name}
        />
        <Input
          name='email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          error={error?.email}
        />
        <Input
          name='role'
          type='text'
          onChange={(e) => setRole(e.target.value)}
          value={role}
          error={error?.role}
        />
        <button className='box-border m-3 w-auto  py-1 rounded text-white font-bold bg-yellow-500  hover:bg-yellow-700'>
          Update
        </button>
      </form>
    </div>
  )
}
