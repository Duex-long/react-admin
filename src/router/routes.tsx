import UserManagement from '@/pages/user'
import { UserOutlined } from '@ant-design/icons'

export const roleRoutes = [
  {
    parent: 'dashboard',
    name: 'user',
    path: 'userManagement',
    element: <UserManagement />,
    icon: <UserOutlined />,
  },
]
