import {
  Card,
  Input,
  Button,
  Typography,
  Textarea
} from '@material-tailwind/react'
import './SaveModal.css'
import { useAppContext } from '../../Context/AppContextProvider'

const SaveModal = (props) => {
  const {
    setShowSaveForm,
    querySummary
  } = useAppContext()
  return (
    <div
      className='modal-background flex flex-col'
    >
      <div className='save-form-container'>
        <Card color='transparent' shadow={false}>
          <Typography variant='h4' color='blue-gray'>
            Save query
          </Typography>
          <Typography color='gray' className='mt-1 font-normal w-96 text-xs'>
            {querySummary}
          </Typography>
          <form className='mt-2 mb-2 w-80 max-w-screen-lg sm:w-96'>
            <div className='mb-1 flex flex-col gap-6'>
              <div className='w-96'>
                <Input label='Query name' />
              </div>
              <div className='w-96'>
                <Textarea label='Query description' />
              </div>
            </div>
            <div className='flex gap-4'>
              <Button className='mt-6 bg-green-500' fullWidth>
                Save
              </Button>
              <Button className='mt-6' fullWidth onClick={()=> setShowSaveForm(false)}>
                Close
              </Button>
            </div>

          </form>

        </Card>
      </div>

    </div>

  )
}

export { SaveModal }
