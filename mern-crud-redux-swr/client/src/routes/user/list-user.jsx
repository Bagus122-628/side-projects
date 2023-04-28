import axios from "axios"
import { Link } from "react-router-dom"
import useSWR, { useSWRConfig } from "swr"
import { local } from "../../app/local-store"

export default function ListUser() {
  const { mutate } = useSWRConfig()
  const token = local.get("token")

  async function fetcher() {
    return axios.get("http://localhost:8080/api/user").then((res) => res.data)
  }

  const { data, isLoading } = useSWR("users", fetcher)
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/user/${id}`, {
      headers: { token },
    })
    mutate("users")
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <main className='flex flex-col  w-9/12 mx-auto'>
      <Link
        to='add'
        className='block rounded px-6 py-1 w-fit bg-green-600 hover:bg-green-700 text-white text-sm font- font-medium'
      >
        add
      </Link>
      <div className=' shadow  mt-3'>
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-100 '>
            <tr>
              <th className='py-3 px-2 text-center'>no</th>
              <th className='py-3 px-2'>name</th>
              <th className='py-3 px-2'>email</th>
              <th className='py-3 px-2'>role</th>
              <th className='py-3 px-2'>action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td className='py-3 px-2 border-b text-center'>{index + 1}</td>
                <td className='py-3 px-2 border-b'>{user.name}</td>
                <td className='py-3 px-2 border-b'>{user.email}</td>
                <td className='py-3 px-2 border-b'>{user.role}</td>
                <td className='py-3 px-2 border-b space-x-2 flex'>
                  <Link
                    to={`edit/${user._id}`}
                    className='block rounded px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold'
                  >
                    Edit
                  </Link>
                  <Link
                    onClick={() => handleDelete(user._id)}
                    className='block rounded px-2 py-1 bg-red-600 hover:bg-red-700 text-white font-bold'
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
