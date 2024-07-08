/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import {Provider} from 'react-redux'
import store from './store/Store.js'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    
  </React.StrictMode>
  
)
