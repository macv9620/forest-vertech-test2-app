import {
  Input,
  Typography,
  Button
} from '@material-tailwind/react'
import { useAppContext } from '../../Context/AppContextProvider'
import { getByQueryData } from '../../Service/BigQuery/getByQueryData'
import { SaveModal } from '../Modals/SaveModal'
import { Link } from 'react-router-dom'

const SimpleRegistrationForm = () => {
  // State to store input values
  const {
    userQuery, setUserQuery, setUserErrorLog, setQueryResultData, setShowLoadingSpinner,
    fromYear, setFromYear, toYear, setToYear, showSaveForm, setShowSaveForm
  } = useAppContext()

  const isDataOk = () => {
    if (userQuery.table === null) {
      setUserErrorLog('Please select a Table')
      return false
    }

    if (Number(fromYear) === 0 || Number(toYear) === 0) {
      setUserErrorLog('From/To year cannot be 0, negative or string')
      return false
    } else if (Number(fromYear) > Number(toYear)) {
      setUserErrorLog('From year must be < To year')
      return false
    } else if (Number(fromYear) < 1990 || Number(fromYear) > 2019) {
      setUserErrorLog('Please type years between 1990 and 2019')
      return false
    } else if (Number(toYear) < 1950 || Number(toYear) > 2019) {
      setUserErrorLog('Please type years between 1990 and 2019')
      return false
    }

    return true
  }

  const checkDataAndShowModal = () => {
    setUserErrorLog(null)
    if (isDataOk()) {
      setShowSaveForm(true)
      setUserQuery((prevUserQuery) => ({
        ...prevUserQuery,
        filters: {
          ...prevUserQuery.filters,
          inventoryYear: [fromYear, toYear]
        }
      }))
    }
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

    if (!isDataOk()) {
      return
    }

    setUserQuery((prevUserQuery) => ({
      ...prevUserQuery,
      filters: {
        ...prevUserQuery.filters,
        inventoryYear: [fromYear, toYear]
      }
    }))

    executeQuery()
  }

  return (
    <div className='flex justify-center w-full gap-2'>
      {showSaveForm && <SaveModal />}
      <form className='max-w-screen-lg flex-row' onSubmit={handleSubmit}>
        <div className='flex flex-row gap-14'>
          <div className='flex gap-12'>
            <div className='w-40'>
              <Input label='From year:' value={fromYear} onChange={(e) => setFromYear(e.target.value)} className='w-40' />
            </div>

            <div className='w-40'>
              <Input label='To year:' value={toYear} onChange={(e) => setToYear(e.target.value)} className='w-40' />
            </div>
          </div>

          <div>
            <Button className='w-30' type='submit'>
              Run query
            </Button>
          </div>

        </div>
      </form>
      <div>
        <Button className='w-30' onClick={checkDataAndShowModal}>
          Save Query
        </Button>
      </div>
      <div>
        <Link to='/savedQueries'>
          <Button
            className='w-30'
            onClick={() => {
              setFromYear('')
              setToYear('')
              setQueryResultData(null)
            }}
          >
            GO TO SAVED QUERIES
          </Button>
        </Link>
      </div>
    </div>
  )
}

export { SimpleRegistrationForm }
