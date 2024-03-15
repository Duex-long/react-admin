import './index.css'
import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/index.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.tsx'
import LoadingIcon from './common/loading/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <LoadingIcon />
    </Provider>
  </React.StrictMode>
)
