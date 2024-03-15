import App from '@/App'
import Layout from '@/common/layout'
import { Login } from '@/pages/login'
import { getToken } from '@/utils/token'
import { RouteObject, redirect } from 'react-router-dom'

const checkIsLogin = () => {
  return true
  // const token = getToken()
  // if (!token) {
  //   return redirect('/login')
  // }
  // return true
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
    ],
    loader: checkIsLogin,
  },
  {
    path: '/login',
    element: <Login />,
  },
]

export { routes }
