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
      <div className='w-auto flex justify-around'>
        <SimpleRegistrationForm />
      </div>
    </>

  )
}

export { FilterBar }
