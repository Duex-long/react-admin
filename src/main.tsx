import './index.css'
import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider, useSelector } from 'react-redux'
import store from './store/index.ts'
import { RouterProvider } from 'react-router-dom'
import { generateRouter } from './router/index.tsx'
import LoadingIcon from './common/loading/index.tsx'

// eslint-disable-next-line react-refresh/only-export-components
const RoutesRender = () => {
  const roleRoutesRedux = useSelector(
    (state: ReturnType<typeof store.getState>) => {
      return state.global.roleRoutes
    }
  )
  console.log(roleRoutesRedux, 'roleRoutesRedux')

  const router = generateRouter(roleRoutesRedux)
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RoutesRender />
      <LoadingIcon />
    </Provider>
  </React.StrictMode>
)


