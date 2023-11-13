import React, { useState } from 'react'
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea
} from '@material-tailwind/react'
import './SaveModal.css'
import { useAppContext } from '../../Context/AppContextProvider'
import { postQuery } from '../../Service/SaveQuery/postQuery'
import { useAuthContext } from '../../Context/AuthContextProvider'

const SaveModal = (props) => {
  const {
    setShowSaveForm,
    querySummary
  } = useAppContext()

  const { userLogged } = useAuthContext()
  const { userQuery, setShowLoadingSpinner } = useAppContext()

  const [queryName, setQueryName] = useState('')
  const [queryDescription, setQueryDescription] = useState('')
  const [checkUserLog, setCheckUserLog] = useState(null)
  const [showSaveButton, setShowSaveButton] = useState(true)

  const validateInputs = () => {
    if (!queryName.trim() || !queryDescription.trim()) {
      console.log('No info in both fields')
      setCheckUserLog('Query name and Query description are required')
      return false
    }
    return true
  }

  const handleSaveClick = () => {
    if (validateInputs()) {
      setShowLoadingSpinner(true)
      setCheckUserLog(null)
      const queryData = {
        nickName: userLogged.nickName,
        queryName,
        queryDescription,
        queryJson: JSON.stringify(userQuery)
      }

      postQuery(queryData)
        .then(res => {
          console.log(res)
          setCheckUserLog(res.data.message)
          setShowSaveButton(false)
          setShowLoadingSpinner(false)
        })
        .catch(e => {
          setShowLoadingSpinner(false)
          if (e.code === 'ERR_NETWORK') {
            setCheckUserLog('Opss! Could not connect to the server')
            return
          }

          if (e.code === 'ERR_BAD_REQUEST') {
            console.log(e)
            setCheckUserLog(e.response.data.message)
          }
        })
    }
  }

  return (
    <div className='modal-background flex flex-col'>
      <div className='save-form-container'>
        <Card color='transparent' shadow={false}>
          <Typography variant='h4' color='blue-gray'>
            Save Query
          </Typography>
          <Typography color='gray' className='mt-1 font-normal w-96 text-xs'>
            {querySummary}
          </Typography>
          <form className='mt-2 mb-2 w-80 max-w-screen-lg sm:w-96'>
            <div className='mb-1 flex flex-col gap-6'>
              <div className='w-96'>
                <Input
                  label='Query name'
                  value={queryName}
                  onChange={(e) => setQueryName(e.target.value)}
                />
              </div>
              <div className='w-96'>
                <Textarea
                  label='Query description'
                  value={queryDescription}
                  onChange={(e) => setQueryDescription(e.target.value)}
                />
              </div>
            </div>
            <p className='text-red-300 text-xs p-1 font-bold'>{checkUserLog}</p>
            <div className='flex gap-4'>
              {showSaveButton &&
                <Button className='mt-6 bg-green-500' fullWidth onClick={handleSaveClick}>
                  Save
                </Button>}
              <Button className='mt-6' fullWidth onClick={() => setShowSaveForm(false)}>
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
