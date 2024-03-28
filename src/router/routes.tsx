import UserManagement from '@/pages/user'
import { UserOutlined } from '@ant-design/icons'
import CommonManagement from '@/pages/common'

type inferArray<T> = T extends Array<infer U> ? U : never
export type roleRoutesTypes = inferArray<typeof roleRoutes>[]
export interface roleRoutesInterface extends roleRoutesTypes {
  children: roleRoutesTypes[]
}

export const roleRoutes = [
  {
    parent: 'dashboard',
    name: 'user',
    path: 'userManagement',
    element: <CommonManagement namespace="user" />,
    icon: <UserOutlined />,
    children: [],
  },
]

const example = [
  {
    Route_id: 1,
    Route_title: 'user',
    Route_path: '/management/user',
    Route_render: 'User',
    Route_icon: 'user-icon',
    Route_parentId: 0,
    Route_role: '0',
  },
]

export const RoleRoutePipe = (roleRoute: typeof example) => {
  return roleRoute.map((item) => {
    const result = {
      id: item.Route_id,
      parent: item.Route_parentId,
      path: item.Route_path,
      icon: <UserOutlined />,
      children: [],
      name: item.Route_title,
      element: <CommonManagement namespace={item.Route_title} />,
    }

    return result
  })
}

