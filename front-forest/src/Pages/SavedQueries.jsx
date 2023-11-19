import { ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/solid'
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { getSavedQueries } from '../Service/SaveQuery/getSavedQueries'
import { useAppContext } from '../Context/AppContextProvider'
import { Link, useNavigate } from 'react-router-dom'
import { CommentsModal } from '../Components/Modals/CommentsModal'
import { useAuthContext } from '../Context/AuthContextProvider'
import { LoggedUserModal } from '../Components/Modals/LoggedUserModal'

const SavedQueries = () => {
  // head of the table
  const TABLE_HEAD = ['User', 'Query Name / Description', 'Comments', 'Date', 'Edit']

  // prints a log with messages for the user
  const [userLog, setUserLog] = useState(null)

  const {
    setShowLoadingSpinner, showSendComment, setShowSendComment,
    syncSavedQueries,
    savedQueriesResult, setSavedQueriesResult
  } = useAppContext()

  // gets the query selected by the user to the dashboard
  const [selectedQueryId, setSelectedQueryId] = useState()

  const { userLogged, setUserLogged } = useAuthContext()
  const navigate = useNavigate()

  // controls the search by nickname in search bar
  const [searchNickname, setSearchNickname] = useState('')

  const filteredQueries = savedQueriesResult?.filter(({ nickName }) =>
    nickName.toLowerCase().includes(searchNickname.toLowerCase())
  )

  // Retrieve loggedUser from sessionStorage
  useEffect(() => {
    const loggedUserString = sessionStorage.getItem('loggedUser')
    if (loggedUserString) {
      try {
        const loggedUserObject = JSON.parse(loggedUserString)
        setUserLogged(loggedUserObject)
      } catch (error) {
        console.error('Error parsing loggedUser from sessionStorage:', error)
      }
    } else {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    setUserLog(null)
    setShowLoadingSpinner(true)
    getSavedQueries()
      .then(res => {
        setShowLoadingSpinner(false)
        setSavedQueriesResult(res.data.data.sort((a1, a2) => a2.queryId - a1.queryId))
        if (res.data.data.length === 0) {
          setUserLog('There is no data to display, save queries in the dashboard view!')
        }
      }).catch(e => {
        setShowLoadingSpinner(false)
        if (e.code === 'ERR_NETWORK') {
          setUserLog('Opss! Could not connect to the server')
        }
      })
  }, [syncSavedQueries])

  const openModalComments = (queryId) => {
    setShowSendComment(true)
    setSelectedQueryId(queryId)
  }

  return (
    <>
      <LoggedUserModal userName={userLogged.name} />
      {showSendComment && (
        <CommentsModal selectedQueryId={selectedQueryId} />
      )}
      <Card className='h-screen w-full flex flex-col justify-around'>
        <CardHeader floated={false} shadow={false} className='rounded-none min-h-[60px]'>
          <div className='flex items-center justify-between gap-8'>
            <div>
              <Typography variant='h5' color='blue-gray'>
                Saved Queries
              </Typography>
              <Typography color='gray' className='mt-1 font-normal'>
                See information about all saved queries
              </Typography>
            </div>
            <div className='flex flex-col items-center justify-center gap-4 md:flex-row'>
              <div className='w-full md:w-40'>
                <Input
                  label='Search Queries by nickname'
                  value={searchNickname}
                  onChange={(e) => setSearchNickname(e.target.value)}
                />
              </div>
            </div>
            <div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
              <Button
                className='flex items-center gap-3'
                size='sm'
                onClick={() => (window.location.href = '/dashboard/general')}
              >
                <ComputerDesktopIcon strokeWidth={2} className='h-4 w-4' /> Go to Dashboard
              </Button>
            </div>
          </div>

        </CardHeader>
        <CardBody className='px-0 scroll-container h-full'>
          <table className='w-full min-w-max table-auto text-left'>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className='border-y border-blue-gray-100 bg-blue-gray-50/50 p-4'
                  >
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal leading-none opacity-70'
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredQueries?.map(
                ({ user, nickName, queryName, queryDescription, createdAt, queryId }, index) => {
                  const isLast = index === savedQueriesResult.length - 1
                  const classes = isLast
                    ? 'p-4'
                    : 'p-4 border-b border-blue-gray-50'
                  const date = (new Date(createdAt)).toString().slice(0, 21)
                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className='flex items-center gap-3'>
                          <Avatar src={'https://placehold.co/155x232/531915/white?text=' + user.name[0].toUpperCase()} alt={user.name} size='sm' />
                          <div className='flex flex-col'>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal'
                            >
                              {user.name}
                            </Typography>
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal opacity-70'
                            >
                              {'@' + nickName}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className='flex flex-col'>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {queryName}
                          </Typography>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal opacity-70 text-center'
                          >
                            {queryDescription}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className='w-max' onClick={() => openModalComments(queryId)}>
                          <Tooltip className='text-center' content='See comments'>
                            <Chip
                              className='cursor-pointer'
                              variant='ghost'
                              size='sm'
                              value='Comments'
                              color='green'
                            />
                          </Tooltip>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal'
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Link to={'/dashBoard/' + queryId}>
                          <Tooltip className='text-center' content='Edit in Dashboard'>
                            <IconButton variant='text'>
                              <PencilIcon className='h-4 w-4' />
                            </IconButton>
                          </Tooltip>
                        </Link>
                      </td>
                    </tr>
                  )
                }
              )}

            </tbody>
          </table>
        </CardBody>
        {userLog && (
          <div className='h-full flex justify-center items-center'>
            <p className='text-red-300 text-xs p-1 font-bold'>{userLog}</p>
          </div>
        )}

        <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
          <Typography variant='small' color='blue-gray' className='font-normal'>
            Ver+ Tech
          </Typography>
        </CardFooter>
      </Card>
    </>
  )
}

export { SavedQueries }
