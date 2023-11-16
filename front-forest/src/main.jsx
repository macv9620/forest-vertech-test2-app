import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextAppProvider } from './Context/AppContextProvider.jsx'
import { ContextAuthProvider } from './Context/AuthContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextAppProvider>
      <ContextAuthProvider>
        <App />
      </ContextAuthProvider>
    </ContextAppProvider>
  </React.StrictMode>
)
