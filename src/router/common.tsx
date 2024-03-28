import App from '@/App'
import Layout from '@/common/layout'
import ReloadPage from '@/pages/error/reloadElement'
import { Login } from '@/pages/login'
import { fetchGet } from '@/utils/fetch'
import { getToken } from '@/utils/token'
import { delayPromise } from '@/utils/util'
import { Navigate, RouteObject, defer, redirect } from 'react-router-dom'

const checkIsLogin = async () => {
  if (!getToken()) return redirect('/login')
  const info = await fetchGet('admin/user/info')
  const staus = info.statusText.toLocaleLowerCase()
  if (staus == 'ok') {
    const infoData = async () => {
      const data = await info.json()
      await delayPromise(3000)
      return data.data
    }
    const mockInfodata = infoData()
    return defer({ info: mockInfodata })
  }
  const errorMessage = {
    message: staus,
  }
  throw errorMessage
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
    errorElement: <ReloadPage />,
  },
  {
    path: '/login',
    element: <Login />,
    children: [],
  },
]

const getBaseRoutes = () => {
  return [
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
      errorElement: <ReloadPage />,
    },
    {
      path: '/login',
      element: <Login />,
      children: [],
    },
  ]
}
export { getBaseRoutes, routes }
