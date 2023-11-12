const SignUp = () => {
  return (
    <>
      <div className='bg-gray-100 flex justify-center items-center h-screen'>

        <div className='w-1/2 h-screen hidden lg:block'>
          <img src='https://png.pngtree.com/background/20230118/original/pngtree-vertical-landscape-photography-of-tree-trunk-street-view-picture-image_2015837.jpg' alt='Placeholder Image' className='object-cover w-full h-full' />
        </div>

        <div className='lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2'>
          <h1 className='text-2xl font-semibold mb-4'>Sign up</h1>
          <form action='#' method='POST'>

            <div className='mb-4'>
              <label htmlFor='username' className='block text-gray-600'>Username</label>
              <input type='text' id='username' name='username' className='w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500' autoComplete='off' />
            </div>

            <button type='submit' className='bg-black hover:bg-blue-900 text-white font-semibold rounded-md py-2 px-4 w-full'>Sign up</button>
          </form>

          <div className='mt-6 text-blue-900 text-center'>
            <a href='#' className='hover:underline'>Login Here</a>
          </div>
        </div>
      </div>
    </>
  )
}

export { SignUp }
