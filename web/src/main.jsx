import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LocalizationProvider } from './contexts/LocalizationContext.jsx'
import { AppProvider } from './contexts/AppContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <LocalizationProvider>
        <App />
      </LocalizationProvider>
    </AppProvider>
  </React.StrictMode>,
)
