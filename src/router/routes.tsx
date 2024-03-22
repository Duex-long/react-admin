import UserManagement from '@/pages/user'
import { UserOutlined } from '@ant-design/icons'

type inferArray<T> = T extends Array<infer U> ? U : never
export type roleRoutesTypes = inferArray<typeof roleRoutes>[]
export interface roleRoutesInterface extends roleRoutesTypes {
  children: roleRoutesTypes[]
}

export const roleRoutes = [
  {
    parent: 'arguments',
    name: 'user',
    path: 'userManagement',
    element: <UserManagement />,
    icon: <UserOutlined />,
    children: [],
  },
]
