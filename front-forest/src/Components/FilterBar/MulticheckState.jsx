import React, { useEffect, useState } from 'react'
import { Checkbox, Select } from '@material-tailwind/react'
import { useAppContext } from '../../Context/AppContextProvider'
import { getAllStates } from '../../Service/States/getAllStates'

const MultiCheckState = () => {
  const { setUserQuery, statesInfo, setStatesInfo, selectedQueryFromSavedQueries, setShowLoadingSpinner, setUserErrorLog } = useAppContext()
  const [selectedValues, setSelectedValues] = useState([])

  // this effect is used to get all states
  useEffect(() => {
    setShowLoadingSpinner(true)
    getAllStates()
      .then((response) => {
        setStatesInfo(response.data.data)
        setShowLoadingSpinner(false)
      })
      .catch((error) => {
        console.log(error)
        setUserErrorLog('Error getting states info')
        setShowLoadingSpinner(false)
      })
  }, [])

  // This effect is used to set the selectedValues when a query is selected from the saved queries
  useEffect(() => {
    if (selectedQueryFromSavedQueries.filters.stateCode) {
      setSelectedValues(selectedQueryFromSavedQueries.filters.stateCode)
    }
  }, [selectedQueryFromSavedQueries])

  useEffect(() => {
    setUserQuery((prevUserQuery) => ({
      ...prevUserQuery,
      filters: {
        ...prevUserQuery.filters,
        stateCode: selectedValues.length > 0 ? selectedValues : null
      }
    }))
  }, [selectedValues, setUserQuery])

  const handleCheckboxChange = (value) => {
    if (selectedValues.includes(Number(value))) {
      const updatedSelectedValues = selectedValues.filter((v) => v !== Number(value))
      setSelectedValues(updatedSelectedValues)
    } else {
      const updatedSelectedValues = [...selectedValues, Number(value)]
      setSelectedValues(updatedSelectedValues)
    }
  }

  return (
    <div className='w-20'>
      <Select variant='outlined' label='Filter by state' className='bg-white rounded'>
        {statesInfo.map((state, index) => (
          <Checkbox
            label={state.stateName}
            value={state.stateCode}
            key={index}
            checked={selectedValues.includes(state.stateCode)}
            onChange={() => handleCheckboxChange(state.stateCode)}
          />
        ))}
      </Select>
    </div>

  )
}

export { MultiCheckState }
