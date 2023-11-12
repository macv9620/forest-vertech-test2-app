import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

// eslint-disable-next-line react/prop-types
const ContextAppProvider = ({ children }) => {
  const [queryResultData, setQueryResultData] = useState(null)
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)
  const [userErrorLog, setUserErrorLog] = useState(null)
  const [toYear, setToYear] = useState('')
  const [fromYear, setFromYear] = useState('')


  const [userQuery, setUserQuery] = useState({
    queryType: 'tree_quantity',
    table: null,
    filters: {
      stateCode: null,
      inventoryYear: null,
      treeHeight: null,
      specieCode: null
    }
  })

  const [statesInfo, setStatesInfo] = useState([
    {
      stateCode: 13,
      stateName: 'Georgia'
    },
    {
      stateCode: 26,
      stateName: 'Michigan'
    },
    {
      stateCode: 27,
      stateName: 'Minnesota'
    },
    {
      stateCode: 37,
      stateName: 'North Carolina'
    }
  ])

  const [speciesInfo, setSpeciesInfo] = useState([
    {
      specieCode: 131,
      specieName: 'Loblolly Pine'
    },
    {
      specieCode: 316,
      specieName: 'Red Maple'
    },
    {
      specieCode: 611,
      specieName: 'Sweetgum'
    },
    {
      specieCode: 746,
      specieName: 'Quaking Aspen'
    }
  ])


  const valuesObject = {
    userQuery,
    setUserQuery,
    userErrorLog,
    setUserErrorLog,
    queryResultData,
    statesInfo,
    speciesInfo,
    setQueryResultData,
    setShowLoadingSpinner,
    showLoadingSpinner,
    toYear,
    setToYear,
    fromYear,
    setFromYear
  }

  return (
    <AppContext.Provider value={valuesObject}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  const contextValue = useContext(AppContext)
  return contextValue
}

// eslint-disable-next-line react-refresh/only-export-components
export { ContextAppProvider, useAppContext }
