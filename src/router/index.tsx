import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { getBaseRoutes } from './common'

const generateRouterList = (
  routes: RouteObject[],
  roleRoutes: RouteObject[]
) => {
  const dasboardIdx = routes.findIndex((r) =>
    r.path ? /dashboard$/i.test(r.path) : false
  )
  if (~dasboardIdx) {
    routes[dasboardIdx].children?.splice(-1, 0, ...roleRoutes)
  }
}

const generateRouter = (roleRoutes: RouteObject[]) => {
  const baseRoute = getBaseRoutes()
  generateRouterList(baseRoute, roleRoutes)
  return createBrowserRouter(baseRoute)
}

//

export { generateRouter }
