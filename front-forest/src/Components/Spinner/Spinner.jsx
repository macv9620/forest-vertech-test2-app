import { PacmanLoader } from 'react-spinners'
import './Spinner.css'

// this component is used to show a loading spinner in load screens
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
