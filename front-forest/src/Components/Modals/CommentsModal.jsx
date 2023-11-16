import { Avatar, Button, Card, Chip, Input, Typography } from '@material-tailwind/react'
import { useAppContext } from '../../Context/AppContextProvider'
import { useState } from 'react'
import { postComment } from '../../Service/SaveComment/SaveComment'
import { useAuthContext } from '../../Context/AuthContextProvider'

const CommentsModal = (props) => {
  const TABLE_HEAD = ['Comment', 'Name', 'NickName', 'Date']
  const { setShowSendComment, setShowLoadingSpinner, setSyncSavedQueries, syncSavedQueries, savedQueriesResult } = useAppContext()
  const { userLogged } = useAuthContext()
  const [userLog, setUserLog] = useState(null)
  const [commentInput, setCommentInput] = useState('')

  const updatedSavedQueriesList = savedQueriesResult?.map(
    ({ user, nickName, queryName, queryDescription, createdAt, comments, queryId }) => {
      return {
        queryId,
        userName: user.name,
        nickName,
        queryName,
        queryDescription,
        imgIcon: 'https://placehold.co/155x232/f6f8fa/black?text=' + user.name[0].toUpperCase(),
        createdAt,
        comments
      }
    })

  const queryToShowInCommentsModal = updatedSavedQueriesList.filter(query => query.queryId === props.selectedQueryId )[0]
  console.log(queryToShowInCommentsModal)

  const handleSendComment = () => {
    if (commentInput === '') {
      setUserLog('Please enter a comment.')
    } else {
      console.log('Ejecutanto petición')
      setUserLog(null)

      const infoToPost = {
        comment: commentInput,
        commentNickName: userLogged.nickName,
        queryId: queryToShowInCommentsModal.queryId
      }

      const excecutePost = () => {
        setShowLoadingSpinner(true)
        postComment(infoToPost)
          .then(res => {
            setUserLog('Comment posted successfully')
            setShowLoadingSpinner(false)
            setSyncSavedQueries(!syncSavedQueries)
            setCommentInput('')
          }).catch(e => {
            setShowLoadingSpinner(false)
            setUserLog(e.code)

            if (e.code === 'ERR_NETWORK') {
              setUserLog('Opss! Could not connect to the server')
              return
            }
            if (e.code === 'ERR_BAD_REQUEST') {
              setUserLog(e.response.data.message)
            }
          })
      }

      excecutePost()
    }
  }

  return (
    <div className='modal-background flex flex-col'>
      <div className='flex w-3/4'>
        <div className='bg-black w-1/4 text-white flex justify-center items-center h-10 rounded-tl-lg'><h1>COMMENTS</h1></div>
        <div className='w-3/4 bg-white flex justify-center items-center h-10 rounded-tr-lg gap-8'>
          <Chip
            className='cursor-pointer'
            variant='ghost'
            size='sm'
            value={queryToShowInCommentsModal.queryName}
            color='green'
          />
          <Chip
            icon={
              <Avatar
                size='xs'
                variant='circular'
                className='h-full w-full -translate-x-0.5'
                alt={queryToShowInCommentsModal.userName}
                src={queryToShowInCommentsModal.imgIcon}
              />
      }
            value={
              <Typography
                variant='small'
                color='white'
                className='font-medium capitalize leading-none'
              >
                {queryToShowInCommentsModal.userName}
              </Typography>
      }
            className='rounded-full py-1.5'
          />
        </div>
      </div>

      <Card className='w-3/4 h-1/2 scroll-container'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
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
            {queryToShowInCommentsModal?.comments?.map(({ comment, user, createdAt }, index) => (
              <tr key={index} className='even:bg-blue-gray-50/50'>
                <td className='p-4'>
                  <Typography variant='small' color='blue-gray' className='font-normal'>
                    {comment}
                  </Typography>
                </td>
                <td className='p-4'>
                  <Typography variant='small' color='blue-gray' className='font-normal'>
                    {user.name}
                  </Typography>
                </td>
                <td className='p-4'>
                  <Chip
                    icon={
                      <Avatar
                        size='xs'
                        variant='circular'
                        className='h-full w-full -translate-x-0.5'
                        alt={user.name}
                        src={'https://placehold.co/155x232/f6f8fa/black?text=' + user.name[0].toUpperCase()}
                      />
      }
                    value={
                      <Typography
                        variant='small'
                        color='white'
                        className='font-medium normal-case leading-none text-xs'
                      >
                        {'@' + user.nickName}
                      </Typography>
      }
                    className='rounded-full py-1.5 w-28'
                  />
                </td>
                <td className='p-4'>
                  <Typography as='a' href='#' variant='small' color='blue-gray' className='font-medium'>
                    {(new Date(createdAt)).toString().slice(0, 21)}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className='w-3/4 bg-white rounded-md flex flex-col justify-center'>
        <h1 className='text-red-300 text-xs p-1 font-bold self-center'>{userLog}</h1>
        <div className='flex justify-center bg-white items-center gap-10 h-20 rounded-md'>
          <div className='w-[30rem] flex items-center justify-center'>
            <Input
              label='¡Add your comment here!'
              success
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
          </div>
          <div className='flex gap-2'>
            <Button className='bg-green-500' onClick={handleSendComment}>
              SEND COMMENT
            </Button>
            <Button onClick={() => setShowSendComment(false)}>CLOSE</Button>
          </div>
          <div />
        </div>
      </div>
    </div>

  )
}

export { CommentsModal }
