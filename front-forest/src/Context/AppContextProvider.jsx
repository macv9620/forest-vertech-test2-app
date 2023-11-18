import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()

// eslint-disable-next-line react/prop-types
const ContextAppProvider = ({ children }) => {
  const [queryResultData, setQueryResultData] = useState(null)
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)
  const [userErrorLog, setUserErrorLog] = useState(null)
  const [toYear, setToYear] = useState('')
  const [fromYear, setFromYear] = useState('')
  const [showSaveForm, setShowSaveForm] = useState(false)
  const [showSendComment, setShowSendComment] = useState(false)
  const [querySummary, setQuerySummary] = useState('')
  const [syncSavedQueries, setSyncSavedQueries] = useState(false)
  const [savedQueriesResult, setSavedQueriesResult] = useState(null)

  const [selectedQueryFromSavedQueries, setSelectedQueryFromSavedQueries] = useState({
    queryType: 'tree_quantity',
    table: null,
    filters: {
      stateCode: null,
      inventoryYear: null,
      treeHeight: null,
      specieCode: null
    }
  })

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
      stateCode: 0,
      stateName: 'Default'
    }
  ])

  const [speciesInfo, setSpeciesInfo] = useState([
    {
      specieCode: 0,
      specieName: 'Default'
    }
  ])

  const querySummaryBuilder = ({ userQuery, speciesInfo, statesInfo }) => {
    const filtersList = []

    if (userQuery.table === null) {
      filtersList.push('Table: no selected')
    } else if (userQuery.table === 'plot_tree') {
      filtersList.push('Table: Number of trees')
    }

    if (userQuery.filters.stateCode === null) {
      filtersList.push('States: all')
    } else {
      filtersList.push('States: ' + userQuery.filters.stateCode.map((stateCode) => {
        const state = statesInfo.find((state) => state.stateCode === stateCode)
        return state.stateName
      }).join(', '))
    }

    if (userQuery.filters.specieCode === null) {
      filtersList.push('Species: all')
    } else {
      filtersList.push('Species: ' + userQuery.filters.specieCode.map((specieCode) => {
        const specie = speciesInfo.find((specie) => specie.specieCode === specieCode)
        return specie.specieName
      }).join(', '))
    }

    if (fromYear === '' && toYear === '') {
      filtersList.push('Years: all')
    } else {
      filtersList.push('Years: from: ' + fromYear + ' to: ' + toYear)
    }

    return filtersList.join(' - ')
  }

  useEffect(() => {
    setQuerySummary(querySummaryBuilder({ userQuery, speciesInfo, statesInfo }))
  }, [userQuery, toYear, fromYear])

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
    setFromYear,
    setShowSaveForm,
    showSaveForm,
    querySummary,
    setQuerySummary,
    querySummaryBuilder,
    showSendComment,
    setShowSendComment,
    syncSavedQueries,
    setSyncSavedQueries,
    savedQueriesResult,
    setSavedQueriesResult,
    selectedQueryFromSavedQueries,
    setSelectedQueryFromSavedQueries,
    setSpeciesInfo,
    setStatesInfo
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
