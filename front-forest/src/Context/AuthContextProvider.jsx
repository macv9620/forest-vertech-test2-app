import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const ContextAuthProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState({
    nickName: '',
    name: ''
  })

  const valuesObject = { userLogged, setUserLogged }

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

export { ContextAuthProvider, useAuthContext }
