import React, { useEffect, useState } from 'react'
import { Checkbox, Select } from '@material-tailwind/react'
import { useAppContext } from '../../Context/AppContextProvider'
import { getAllSpecies } from '../../Service/Species/getAllSpecies'

const MultiCheckSpecie = () => {
  const { setUserQuery, speciesInfo, setSpeciesInfo, selectedQueryFromSavedQueries, setShowLoadingSpinner, setUserErrorLog } = useAppContext()
  const [selectedValues, setSelectedValues] = useState([])

  useEffect(() => {
    setShowLoadingSpinner(true)
    getAllSpecies()
      .then((response) => {
        setSpeciesInfo(response.data.data)
        setShowLoadingSpinner(false)
      })
      .catch((error) => {
        console.log(error)
        setUserErrorLog('Error getting species info')
        setShowLoadingSpinner(false)
      })
  }, [])

  useEffect(() => {
    if (selectedQueryFromSavedQueries.filters.specieCode) {
      setSelectedValues(selectedQueryFromSavedQueries.filters.specieCode)
    }
  }, [selectedQueryFromSavedQueries])

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

  return (
    <div className='w-40'>
      <Select variant='outlined' label='Filter by specie' className='bg-white rounded'>
        {speciesInfo.map((specie, index) => (
          <Checkbox
            label={specie.specieName}
            value={specie.specieCode}
            key={index}
            checked={selectedValues.includes(specie.specieCode)}
            onChange={() => handleCheckboxChange(specie.specieCode)}
          />
        ))}
      </Select>
    </div>

  )
}

export { MultiCheckSpecie }
