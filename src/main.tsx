import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StyleProvider } from '@ant-design/cssinjs'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StyleProvider layer>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </StyleProvider>
    </BrowserRouter>
  </React.StrictMode>
)
