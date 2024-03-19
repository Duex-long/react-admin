import { DeleteButton } from '@/common/table'
import { Space, Tag } from 'antd'

interface DataType {
  key: string
  user: string
  last_login_time: number
  last_login_channel: string
  create_time: number
  roles: string[]
}

const customColumnRender = (data: string[]) => {
  return (
    <>
      {data.map((item) => (
        <Tag key={item} color="geekblue">
          {item + 'custom'}
        </Tag>
      ))}
    </>
  )
}

export const columns = [
  {
    title: 'user',
    dataIndex: 'user',
    key: 'user',
    width: '20%',
  },
  {
    title: 'create_time',
    dataIndex: 'create_time',
    key: 'create_time',
    width: '20%',
  },
  {
    title: 'last_login_time',
    dataIndex: 'last_login_time',
    key: 'last_login_time',
    width: '20%',
  },
  {
    title: 'last_login_channel',
    dataIndex: 'last_login_channel',
    key: 'last_login_channel',
    width: '20%',
  },
  {
    title: 'roles',
    dataIndex: 'roles',
    key: 'roles',
    width: '20%',
    render: customColumnRender,
  },
  {
    title: 'options',
    key: 'options',
    render: ({ id }) => (
      <>
        <Space size="middle">
          <DeleteButton />
        </Space>
      </>
    ),
  },
]

export const mockData: DataType[] = [
  {
    key: '1',
    user: 'John Brown',
    create_time: 32,
    last_login_time: 0,
    last_login_channel: '1',
    roles: ['1', '2'],
  },
  {
    key: '1',
    user: 'John Brown',
    create_time: 32,
    last_login_time: 0,
    last_login_channel: '1',
    roles: ['1', '2'],
  },
  {
    key: '1',
    user: 'John Brown',
    create_time: 32,
    last_login_time: 0,
    last_login_channel: '1',
    roles: ['1', '2'],
  },
  {
    key: '1',
    user: 'John Brown',
    create_time: 32,
    last_login_time: 0,
    last_login_channel: '1',
    roles: ['1', '2'],
  },
  {
    key: '1',
    user: 'John Brown',
    create_time: 32,
    last_login_time: 0,
    last_login_channel: '1',
    roles: ['1', '2'],
  },
  {
    key: '1',
    user: 'John Brown',
    create_time: 32,
    last_login_time: 0,
    last_login_channel: '1',
    roles: ['1', '2'],
  },
  {
    key: '1',
    user: 'John Brown',
    create_time: 32,
    last_login_time: 0,
    last_login_channel: '1',
    roles: ['1', '2'],
  },
]
