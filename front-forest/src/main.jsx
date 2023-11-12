import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextAppProvider } from './Context/AppContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextAppProvider>
      <App />
    </ContextAppProvider>
  </React.StrictMode>
)
