import BarChart from '../Components/Chart/BarChart'
import { FilterBar } from '../Components/FilterBar/FilterBar'
import { useAppContext } from '../Context/AppContextProvider'
import { useAuthContext } from '../Context/AuthContextProvider'

const DashBoard = () => {
  const { userErrorLog, querySummary } = useAppContext()
  const { userLogged } = useAuthContext()

  return (
    <div className='dashboard font-sans flex justify-center'>

      <div className='container mx-screen px-4 sm:px-8'>
        <div className='py-2'>
          <div>
            <h2 className='text-2xl font-semibold leading-tight text-center'>Dashboard - Welcome {userLogged.name} [@{userLogged.nickName}]</h2>
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
  )
}

export { DashBoard }
