import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { reset } from "../app/context"
import { local } from "../app/local-store"

export default function Navbar() {
  const name = useSelector((state) => state.context.name)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(reset())
    local.remove("token")
  }

  return (
    <header className='flex p-3 border-b-2 shadow-sm mb-4'>
      <Link to='/'>
        <img src='vite.svg' alt='vite' />
      </Link>
      <h4 className='text-xl font-semibold text-slate-600'>Simple CRUD App</h4>

      <ul className='flex gap-2 ml-auto '>
        {!name ? (
          <>
            <li>
              <Link
                to='/login'
                className='block px-2 py-1 border-[3px] border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white text-sm font-medium'
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to='/register'
                className='block px-2 py-1 border-[3px] border-yellow-400 bg-yellow-400 text-white font-medium text-sm hover:bg-yellow-600 hover:border-yellow-600'
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>{name}</li>
            <li>
              <Link
                onClick={() => handleLogout()}
                className='bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded font-bold text-sm'
              >
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}
