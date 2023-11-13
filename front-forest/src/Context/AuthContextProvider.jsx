import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
const ContextAuthProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState({
    nickName: 'macv9620',
    name: 'Mateo'
  })
  const valuesObject = { userLogged }

  return (
    <AuthContext.Provider value={valuesObject}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => {
  const contextValue = useContext(AuthContext)
  return contextValue
}

// eslint-disable-next-line react-refresh/only-export-components
export { ContextAuthProvider, useAuthContext }
