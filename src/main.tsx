import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider, useSelector } from 'react-redux'
import './index.css'
import store from './store/index.ts'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import { Login } from './pages/login/index.tsx'
import { Spin } from 'antd'
import { getToken } from './utils/token.ts'

const checkIsLogin = () => {
  const token = getToken()
  if (!token) {
    return redirect('/login')
  }
  return true
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: checkIsLogin,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

const LoadingIcon = () => {
  const loadingState = useSelector(
    (state: ReturnType<typeof store.getState>) => state.loading.loadingState
  )
  console.log(loadingState, 'loadingSlice')
  return (
    <div
      className="loading"
      style={{ visibility: loadingState ? 'visible' : 'hidden' }}
    >
      <Spin size="large" />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <LoadingIcon />
    </Provider>
  </React.StrictMode>
)
