import BarChart from '../Components/Chart/BarChart'
import { FilterBar } from '../Components/FilterBar/FilterBar'
import { SaveModal } from '../Components/Modals/SaveModal'
import { useAppContext } from '../Context/AppContextProvider'

const DashBoard = () => {
  const { userErrorLog, userQuery, fromYear, toYear } = useAppContext()

  const querySummaryBuilder = (queryObject) => {
    const filtersList = []

    if (queryObject.table === null) {
      filtersList.push('Table: no selected')
    } else if (queryObject.table === 'plot_tree') {
      filtersList.push('Table: Number of trees')
    }

    if (queryObject.filters.stateCode === null) {
      filtersList.push('States: all')
    } else {
      filtersList.push('States: ' + queryObject.filters.stateCode.join(', '))
    }

    if (queryObject.filters.specieCode === null) {
      filtersList.push('Species: all')
    } else {
      filtersList.push('Species: ' + queryObject.filters.specieCode.join(', '))
    }

    if (fromYear === '' && toYear === '') {
      filtersList.push('Years: all')
    } else {
      filtersList.push('Years: from = ' + fromYear + ' to = ' + toYear)
    }

    return filtersList.join(' - ')
  }

  const querySummary = querySummaryBuilder(userQuery)

  return (
    <div className='font-sans bg-gray-200 flex justify-center'>
      <div className='container mx-screen px-4 sm:px-8'>
        <div className='py-2'>
          <div>
            <h2 className='text-2xl font-semibold leading-tight'>Dashboard</h2>
          </div>
          <FilterBar />
          {userErrorLog && <div className='flex justify-center'><p className='text-red-300 text-xs p-1 font-bold'>{userErrorLog}</p></div>}
          <div className='flex justify-center'>
            <p className='text-xs p-1'>Query summary / {querySummary}</p>
          </div>
          <BarChart />
          <SaveModal />
        </div>
      </div>
    </div>
  )
}

export { DashBoard }
