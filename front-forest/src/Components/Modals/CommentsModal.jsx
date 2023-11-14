import { Button, Card, Input, Textarea, Typography } from '@material-tailwind/react'
import { useAppContext } from '../../Context/AppContextProvider'

const TABLE_HEAD = ['Name', 'Job', 'Employed', '']

const TABLE_ROWS = [
  {
    name: 'John Michael',
    job: 'Manager',
    date: '23/04/18'
  },
  {
    name: 'Alexa Liras',
    job: 'Developer',
    date: '23/04/18'
  },
  {
    name: 'Laurent Perrier',
    job: 'Executive',
    date: '19/09/17'
  },
  {
    name: 'Michael Levi',
    job: 'Developer',
    date: '24/12/08'
  },
  {
    name: 'Richard Gran',
    job: 'Manager',
    date: '04/10/21'
  }
]

const CommentsModal = () => {
  const { setShowSendComment } = useAppContext()
  return (
    <div className='modal-background flex flex-col'>
      <Card className='w-3/4 h-1/2'>
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
            {TABLE_ROWS.map(({ name, job, date }, index) => (
              <tr key={name} className='even:bg-blue-gray-50/50'>
                <td className='p-4'>
                  <Typography variant='small' color='blue-gray' className='font-normal'>
                    {name}
                  </Typography>
                </td>
                <td className='p-4'>
                  <Typography variant='small' color='blue-gray' className='font-normal'>
                    {job}
                  </Typography>
                </td>
                <td className='p-4'>
                  <Typography variant='small' color='blue-gray' className='font-normal'>
                    {date}
                  </Typography>
                </td>
                <td className='p-4'>
                  <Typography as='a' href='#' variant='small' color='blue-gray' className='font-medium'>
                    Edit
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className='w-3/4 h-20 flex justify-center bg-white rounded-md items-center gap-10'>
        <div className='w-[30rem] flex items-center justify-center'>
          <Input label='Add your comment here' success />
        </div>
        <div className='flex gap-2'>
          <Button className='bg-green-500'>SEND COMMENT</Button>

          <Button onClick={() => setShowSendComment(false)}>CLOSE</Button>
        </div>
        <div />
      </div>

    </div>

  )
}

export { CommentsModal }
