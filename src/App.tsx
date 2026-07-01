
import { BrowserRouter } from 'react-router'
import {  Routes } from 'react-router'

import './App.css'
import { HeaderActionsProvider } from './core/provider/HeaderActionProvider/HeaderAction'
import ProtectedRoute from './core/provider/ProtectedRoute'
import ToastProvider from './core/provider/ToastProvider'
import { getRoutes } from './core/lib/getRoutes'

function App() {

  return (
    <HeaderActionsProvider>
      <BrowserRouter basename="/app">

        <ToastProvider/>
        <ProtectedRoute>
          <Routes >
            
          </Routes>
        </ProtectedRoute>
      </BrowserRouter>
    </HeaderActionsProvider>
  )
}

export default App
