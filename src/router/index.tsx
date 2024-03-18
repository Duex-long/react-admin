import { createBrowserRouter } from 'react-router-dom'
import { routes } from './common'
import { roleRoutes } from './routes'

const generateRouterList = () => {
  const dasboardIdx = routes.findIndex((r) =>
    r.path ? /dashboard$/i.test(r.path) : false
  )
  if (~dasboardIdx) {
    routes[dasboardIdx].children?.splice(-1, 0, ...roleRoutes)
  }
}
generateRouterList()

const router = createBrowserRouter(routes)

export { router }
