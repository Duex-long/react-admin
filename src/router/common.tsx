import App from '@/App'
import Layout from '@/common/layout'
import { Login } from '@/pages/login'
import { getToken } from '@/utils/token'
import { Navigate, RouteObject, redirect } from 'react-router-dom'

const checkIsLogin = () => {
  const token = getToken()
  if (!token) {
    return redirect('/login')
  }
  return true
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/dashboard',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },

      {
        path: '*',
        element: <Navigate to="/dashboard" replace />,
      },
    ],
    loader: checkIsLogin,
  },
  {
    path: '/login',
    element: <Login />,
    children: [],
  },
]

export { routes }
