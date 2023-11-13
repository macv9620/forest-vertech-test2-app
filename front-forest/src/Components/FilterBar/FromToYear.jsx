import {
  Input,
  Typography
} from '@material-tailwind/react'
import { useAppContext } from '../../Context/AppContextProvider'
import { getByQueryData } from '../../service/getByQueryData'

const SimpleRegistrationForm = () => {
  // State to store input values
  const {
    userQuery, setUserQuery, setUserErrorLog, setQueryResultData, setShowLoadingSpinner,
    fromYear, setFromYear, toYear, setToYear
  } = useAppContext()

  const checkFormData = () => {
    if (userQuery.table === null) {
      setUserErrorLog('Please select a Table')
      return true
    }

    if (Number(fromYear) === 0 || Number(toYear) === 0) {
      setUserErrorLog('From/To year cannot be 0, negative or string')
      return true
    } else if (Number(fromYear) > Number(toYear)) {
      setUserErrorLog('From year must be < To year')
      return true
    } else if (Number(fromYear) < 1990 || Number(fromYear) > 2050) {
      setUserErrorLog('Please type years between 1990 and 2024')
      return true
    } else if (Number(toYear) < 1950 || Number(toYear) > 2024) {
      setUserErrorLog('Please type years between 1950 and 2024')
      return true
    }

    return false
  }

  const executeQuery = () => {
    setShowLoadingSpinner(true)
    getByQueryData({
      ...userQuery,
      filters: {
        ...userQuery.filters,
        inventoryYear: [fromYear, toYear]
      }
    }).then((res) => {
      console.log(res)
      console.log(res.data.data.length)
      if (res.data.data.length === 0) {
        setQueryResultData(null)
        setUserErrorLog('Your query returned no results, update your filters and run again')
      } else {
        setQueryResultData(res.data.data)
      }
      setShowLoadingSpinner(false)
    }).catch((e) => {
      setShowLoadingSpinner(false)
      if (e.code === 'ERR_NETWORK') {
        setUserErrorLog('Opss! Could not connect to the server')
        setQueryResultData(null)
      }
    })
  }

  const handleSubmit = (e) => {
    setUserErrorLog(null)
    e.preventDefault()

    if (checkFormData()) {
      return
    }

    setUserQuery((prevUserQuery) => ({
      ...prevUserQuery,
      filters: {
        ...prevUserQuery.filters,
        inventoryYear: [fromYear, toYear]
      }
    }))
    console.log({
      ...userQuery,
      filters: {
        ...userQuery.filters,
        inventoryYear: [fromYear, toYear]
      }
    })

    executeQuery()
  }

  return (
    <div className='flex justify-center w-full'>
      <form className='mt-1 mb-1 w-screen max-w-screen-lg sm:w-96 flex-row' onSubmit={handleSubmit}>
        <div className='mb-1 flex flex-row gap-4 w-2'>
          <Typography variant='h6' color='blue-gray' className='-mb-3 w-8'>
            Year:
          </Typography>
          <Input
            size='lg'
            variant='static'
            placeholder='2011'
            className='w-4 !border-t-blue-gray-200 focus:!border-t-gray-900'
            label='From'
            value={fromYear}
            onChange={(e) => setFromYear(e.target.value)}
          />

          <Input
            size='lg'
            placeholder='2017'
            variant='static'
            className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
            label='To'
            value={toYear}
            onChange={(e) => setToYear(e.target.value)}
          />
          <button type='submit' className='bg-black hover:bg-gray-900 text-white font-semibold rounded-md px-6 text-xs w-72'>Run Query</button>
        </div>
      </form>
    </div>
  )
}

export { SimpleRegistrationForm }
