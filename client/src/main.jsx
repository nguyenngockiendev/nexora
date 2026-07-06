import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import AppRoute from './app/routes/AppRoutes.jsx'
import { ToastContainer } from 'react-toastify'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoute/>
    <ToastContainer position="top-right" autoClose={3000}/>
  </StrictMode>,
)
