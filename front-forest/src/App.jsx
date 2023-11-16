import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { DashBoard } from './Pages/DashBoard'
import { Login } from './Pages/Login'
import { LoadingSpinner } from './Components/Spinner/Spinner'
import { useAppContext } from './Context/AppContextProvider'
import { SavedQueries } from './Pages/SavedQueries'
import { SignUp } from './Pages/SignUp'

function App () {
  const { showLoadingSpinner } = useAppContext()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/dashboard/:selectedQueryId' element={<DashBoard />} />
          <Route path='/savedQueries' element={<SavedQueries />} />
        </Routes>
      </BrowserRouter>
      {showLoadingSpinner && <LoadingSpinner />}
    </>
  )
}

export default App
