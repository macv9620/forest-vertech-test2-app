import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { DashBoard } from './Pages/DashBoard'
import { Login } from './Pages/Login'
import { LoadingSpinner } from './Components/Spinner/Spinner'
import { useAppContext } from './Context/AppContextProvider'
import { SavedQueries } from './Pages/SavedQueries'

function App () {
  const { showLoadingSpinner } = useAppContext()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/savedQueries' element={<SavedQueries />} />
        </Routes>
      </BrowserRouter>
      {showLoadingSpinner && <LoadingSpinner />}
    </>
  )
}

export default App
