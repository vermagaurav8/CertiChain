import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ToastContainer, toast } from 'react-toastify'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer position={toast.POSITION.TOP_CENTER}  theme='dark' limit={1}/>
    <App />
  </React.StrictMode>,
)
