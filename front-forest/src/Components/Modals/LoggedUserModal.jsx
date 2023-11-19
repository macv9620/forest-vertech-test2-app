import { Avatar, Chip, Typography } from '@material-tailwind/react'

// this modal is used to show the logged user name in the dashboard
const LoggedUserModal = (props) => {
  return (
    <div className='fixed bottom-4 right-4 z-20'>
      <Chip
        icon={
          <Avatar
            size='xs'
            variant='circular'
            className='h-full w-full -translate-x-0.5'
            alt={props?.userName}
            src={'https://placehold.co/155x232/f2f9f2/black?text=' + props?.userName[0]?.toUpperCase()}
          />
        }
        value={
          <Typography
            variant='small'
            color='white'
            className='font-medium capitalize leading-none'
          >
            {props?.userName}
          </Typography>
        }
        className='rounded-full py-1.5 bg-red-900'
      />
    </div>
  )
}

export { LoggedUserModal }
