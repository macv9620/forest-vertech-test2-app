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
  const [infoToShowInCommentModal, setInfoToShowInCommentModal] = useState(null)
  const [syncSavedQueries, setSyncSavedQueries] = useState(false)

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

  const querySummaryBuilder = (queryObject) => {
    const filtersList = []

    if (queryObject.table === null) {
      filtersList.push('Table: no selected')
    } else if (queryObject.table === 'plot_tree') {
      filtersList.push('Table: Number of trees')
    }

    if (queryObject.filters.stateCode === null) {
      filtersList.push('States: all')
    } else {
      filtersList.push('States: ' + queryObject.filters.stateCode.join(', '))
    }

    if (queryObject.filters.specieCode === null) {
      filtersList.push('Species: all')
    } else {
      filtersList.push('Species: ' + queryObject.filters.specieCode.join(', '))
    }

    if (fromYear === '' && toYear === '') {
      filtersList.push('Years: all')
    } else {
      filtersList.push('Years: from: ' + fromYear + ' to: ' + toYear)
    }

    return filtersList.join(' - ')
  }

  useEffect(() => {
    setQuerySummary(querySummaryBuilder(userQuery))
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
    infoToShowInCommentModal,
    setInfoToShowInCommentModal,
    syncSavedQueries,
    setSyncSavedQueries
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
