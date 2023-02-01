import React from 'react'
import ReactDOM from 'react-dom/client'
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import App from './App'
import './index.css'
import { DialogContextProvider } from './useDialog'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DialogContextProvider>
        <App />
      </DialogContextProvider>
    </ThemeProvider>
  </React.StrictMode>
)
