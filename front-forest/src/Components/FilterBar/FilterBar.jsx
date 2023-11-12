import { Spinner } from '@material-tailwind/react'
import { SimpleRegistrationForm } from './FromToYear'
import { MultiCheckSpecie } from './MultiCheckSpecie'
import { MultiCheckState } from './MulticheckState'
import { SelectTable } from './SelectTable'

const FilterBar = () => {
  return (

    <>
      <div className='flex w-auto flex-row justify-around align-center my-4'>
        <SelectTable />
        <MultiCheckState />
        <MultiCheckSpecie />
      </div>
      <div>
        <SimpleRegistrationForm />
      </div>
    </>

  )
}

export { FilterBar }
