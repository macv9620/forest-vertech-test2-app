import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()

// eslint-disable-next-line react/prop-types
const ContextAppProvider = ({ children }) => {
  // this state is used to store the query result data when big queries are executed
  const [queryResultData, setQueryResultData] = useState(null)

  // controls the loading spinner rendering
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)

  // show the error message when the user query is not valid
  const [userErrorLog, setUserErrorLog] = useState(null)

  // get the years from the dashboard
  const [toYear, setToYear] = useState('')
  const [fromYear, setFromYear] = useState('')

  // controls the render of save query modal
  const [showSaveForm, setShowSaveForm] = useState(false)

  // controls the render of send comment modal
  const [showSendComment, setShowSendComment] = useState(false)

  // this state is used to store the query summary and print it in the dashboard
  const [querySummary, setQuerySummary] = useState('')

  // syncs the saved queries to get new comments recently added
  const [syncSavedQueries, setSyncSavedQueries] = useState(false)

  // this state is used to store the saved queries result
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

  // contains the states info from database
  const [statesInfo, setStatesInfo] = useState([
    {
      stateCode: 0,
      stateName: 'Default'
    }
  ])

  // contains the species info from database
  const [speciesInfo, setSpeciesInfo] = useState([
    {
      specieCode: 0,
      specieName: 'Default'
    }
  ])

  // this function prints the filters selected by the user in dashboard
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

  // this effect is used to update the query summary when the user changes the filters
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
