import { PacmanLoader } from 'react-spinners'
import './Spinner.css'

const LoadingSpinner = () => {
  return (
    <div
      className='spinner-background flex flex-col'
    >
      <PacmanLoader
        color='black'
        loading
      />
      <h1>Loading</h1>
    </div>
  )
}

export { LoadingSpinner }
