import React, { useEffect, useState } from 'react'
import { Checkbox, Select } from '@material-tailwind/react'
import { useAppContext } from '../../Context/AppContextProvider'

const MultiCheckSpecie = () => {
  const { setUserQuery, speciesInfo } = useAppContext()
  const [selectedValues, setSelectedValues] = useState([])

  useEffect(() => {
    // Update stateCode in userQuery when selectedValues change
    setUserQuery((prevUserQuery) => ({
      ...prevUserQuery,
      filters: {
        ...prevUserQuery.filters,
        specieCode: selectedValues.length > 0 ? selectedValues : null
      }
    }))
  }, [selectedValues, setUserQuery])

  const handleCheckboxChange = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value))
    } else {
      setSelectedValues([...selectedValues, value])
    }
  }

  console.log(JSON.stringify(selectedValues))

  return (
    <div className='w-40'>
      <Select variant='outlined' label='Filter by specie' className='bg-white rounded'>
        {speciesInfo?.map((specie, index) => (
          <Checkbox
            label={specie.specieName}
            value={specie.specieCode}
            key={index}
            checked={selectedValues.includes(specie.specieCode)}
            onChange={() => handleCheckboxChange(specie.specieCode)}
          />
        ))}
        <p>Selected values: {JSON.stringify(selectedValues)}</p>
      </Select>
    </div>

  )
}

export { MultiCheckSpecie }
