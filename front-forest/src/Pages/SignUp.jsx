import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postUser } from '../Service/Login/PostUser'
import { useAppContext } from '../Context/AppContextProvider'

const SignUp = () => {
  const [nickName, setNickName] = useState('')
  const [name, setName] = useState('')
  const [userLog, setUserLog] = useState('')
  const { setShowLoadingSpinner } = useAppContext()

  const navigate = useNavigate()

  const handleSignUp = (e) => {
    e.preventDefault()

    if (!nickName || !name) {
      setUserLog('Please fill in all fields')
    } else {
      const userInfo = {
        nickName,
        name
      }
      setShowLoadingSpinner(true)
      postUser(userInfo)
        .then(res => {
          navigate('/')
          setShowLoadingSpinner(false)
        })
        .catch(e => {
          setShowLoadingSpinner(false)
          if (e.code === 'ERR_NETWORK') {
            setUserLog('Opss! Could not connect to the server')
            return
          }
          if (e.code === 'ERR_BAD_REQUEST') {
            if (e.response.status === 201) {
              setUserLog(e.response.data.message)
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
          <h1 className='text-2xl font-semibold mb-4'>Sign up</h1>
          <form onSubmit={handleSignUp}>
            <div className='mb-4'>
              <label htmlFor='nickName' className='block text-gray-600'>
                NickName
              </label>
              <input
                type='text'
                id='nickName'
                name='nickName'
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                autoComplete='off'
              />
            </div>

            <div className='mb-4'>
              <label htmlFor='name' className='block text-gray-600'>
                Your name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500'
                autoComplete='off'
              />
            </div>

            <button
              type='submit'
              className='bg-black hover:bg-teal-900 text-white font-semibold rounded-md py-2 px-4 w-full'
            >
              Sign up
            </button>
          </form>

          <h1 className='text-pink-900 text-xs p-1 font-bold self-center'>
            {userLog}
          </h1>

          <div className='mt-6 text-blue-900 text-center'>
            <Link to='/'>
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export { SignUp }
