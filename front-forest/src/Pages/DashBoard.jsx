import { useEffect } from 'react'
import BarChart from '../Components/Chart/BarChart'
import { FilterBar } from '../Components/FilterBar/FilterBar'
import { useAppContext } from '../Context/AppContextProvider'
import { useAuthContext } from '../Context/AuthContextProvider'
import { useNavigate, useParams } from 'react-router-dom'
import { LoggedUserModal } from '../Components/Modals/LoggedUserModal'
import { getQueryById } from '../Service/SaveQuery/getQueryById'

const DashBoard = () => {
  const { userErrorLog, querySummary } = useAppContext()
  const { userLogged, setUserLogged } = useAuthContext()
  const navigate = useNavigate()

  const paramsObject = useParams()

  console.log('paramsObject:', paramsObject)

  // Retrieve loggedUser from sessionStorage on component mount
  useEffect(() => {
    const loggedUserString = sessionStorage.getItem('loggedUser')
    if (loggedUserString) {
      try {
        const loggedUserObject = JSON.parse(loggedUserString)
        setUserLogged(loggedUserObject)
      } catch (error) {
        console.error('Error parsing loggedUser from sessionStorage:', error)
      }
    } else {
      navigate('/')
    }

    if (paramsObject?.selectedQueryId !== 'general') {
      getQueryById(paramsObject.selectedQueryId)
        .then(response => {
          console.log('response:', JSON.parse(response.data.data.queryJson))
        }).catch(error => {
          console.error('error:', error)
        })
    }
  }, [])

  return (
    <><LoggedUserModal userName={userLogged?.name} />
      <div className='dashboard font-sans flex justify-center'>
        <div className='container mx-screen px-4 sm:px-8'>
          <div className='py-2'>
            <div>
              <h2 className='text-2xl font-semibold leading-tight text-center'>Dashboard</h2>
            </div>
            <FilterBar />
            {userErrorLog && <div className='flex justify-center'><p className='text-red-300 text-xs p-1 font-bold'>{userErrorLog}</p></div>}
            <div className='flex justify-center'>
              <p className='text-xs p-1'>Query summary / {querySummary}</p>
            </div>
            <BarChart />
          </div>
        </div>
      </div>
    </>
  )
}

export { DashBoard }
