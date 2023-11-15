import React, { useState } from 'react'
import { Select, Option } from '@material-tailwind/react'
import { useAppContext } from '../../Context/AppContextProvider'

const SelectTable = () => {
  const { setUserQuery, userQuery } = useAppContext()
  const [selectedValue, setSelectedValue] = useState('')

  const handleSelectChange = (value) => {
    setSelectedValue(value)
    setUserQuery({
      ...userQuery,
      table: value
    })
  }

  return (
    <div className='w-20'>
      <Select
        label='Select Table*'
        placeholder='Number of trees'
        className='bg-white rounded'
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <Option value='plot_tree' className='px-4'>Number of trees</Option>
        <Option disabled>Tree Map</Option>
      </Select>
    </div>
  )
}

export { SelectTable }
