import React, { useState } from 'react'
import { postLogin } from '../Service/Login/PostLogin'
import { useAppContext } from '../Context/AppContextProvider'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [userLog, setUserLog] = useState('')
  const { setShowLoadingSpinner } = useAppContext()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (username.trim() === '') {
      setUserLog('Username cannot be empty')
    } else {
      setShowLoadingSpinner(true)
      setUserLog('')

      postLogin(username)
        .then((res) => {
          console.log(res)
          console.log('User logged successfully')
          setShowLoadingSpinner(false)
          console.log(res.data.data)
          sessionStorage.setItem('loggedUser', JSON.stringify(res.data.data))
          navigate('/dashBoard')
        })
        .catch((e) => {
          setShowLoadingSpinner(false)
          if (e.code === 'ERR_NETWORK') {
            setUserLog('Opss! Could not connect to the server')
            return
          }
          if (e.code === 'ERR_BAD_REQUEST') {
            if (e.response.status === 401) {
              setUserLog("User doesn't exist, check your user or sign up")
            }
          }
        })
    }
  }

  return (
    <>
      <div className='bg-gray-100 flex justify-center items-center h-screen'>
        <div className='w-1/2 h-screen hidden lg:block'>
          <img
            src='https://png.pngtree.com/background/20230118/original/pngtree-vertical-landscape-photography-of-tree-trunk-street-view-picture-image_2015837.jpg'
            alt='Placeholder Image'
            className='object-cover w-full h-full'
          />
        </div>

        <div className='lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2'>
          <h1 className='text-2xl font-semibold mb-4'>Login</h1>
          <form action='#' method='POST'>
            <div className='mb-4'>
              <label htmlFor='username' className='block text-gray-600'>
                NickName
              </label>
              <input
                type='text'
                id='username'
                name='username'
                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                autoComplete='off'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <button
              type='submit'
              className='bg-black hover:bg-blue-900 text-white font-semibold rounded-md py-2 px-4 w-full'
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
          <h1 className='text-red-300 text-xs p-1 font-bold self-center'>
            {userLog}
          </h1>
          <div className='mt-6 text-blue-900 text-center'>
            <Link to='/signUp'>
              Sign up Here
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export { Login }
