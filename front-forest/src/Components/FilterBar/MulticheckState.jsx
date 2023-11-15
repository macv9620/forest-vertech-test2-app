import React, { useEffect, useState } from 'react'
import { Checkbox, Select } from '@material-tailwind/react'
import { useAppContext } from '../../Context/AppContextProvider'

const MultiCheckState = () => {
  const { userQuery, setUserQuery, statesInfo } = useAppContext()
  const [selectedValues, setSelectedValues] = useState([])

  useEffect(() => {
    // Update stateCode in userQuery when selectedValues change
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
        {statesInfo?.map((state, index) => (
          <Checkbox
            label={state.stateName}
            value={state.stateCode}
            key={index}
            checked={selectedValues.includes(state.stateCode)}
            onChange={() => handleCheckboxChange(state.stateCode)}
          />
        ))}
        <p>Selected values: {JSON.stringify(selectedValues)}</p>
      </Select>
    </div>

  )
}

export { MultiCheckState }
