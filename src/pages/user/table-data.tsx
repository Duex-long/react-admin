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
    width: '20%',
  },
  {
    title: 'create_time',
    dataIndex: 'create_time',
    width: '20%',
  },
  {
    title: 'last_login_time',
    dataIndex: 'last_login_time',
    width: '20%',
  },
  {
    title: 'last_login_channel',
    dataIndex: 'last_login_channel',
    width: '20%',
  },
  {
    title: 'roles',
    dataIndex: 'roles',
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
    key: '2',
    user: 'John Brown',
    create_time: 32,
    last_login_time: 0,
    last_login_channel: '1',
    roles: ['1', '2'],
  },
  {
    key: '3',
    user: 'John Brown',
    create_time: 32,
    last_login_time: 0,
    last_login_channel: '1',
    roles: ['1', '2'],
  },
  {
    key: '4',
    user: 'John Brown',
    create_time: 32,
    last_login_time: 0,
    last_login_channel: '1',
    roles: ['1', '2'],
  },
  {
    key: '5',
    user: 'John Brown',
    create_time: 32,
    last_login_time: 0,
    last_login_channel: '1',
    roles: ['1', '2'],
  },
  {
    key: '6',
    user: 'John Brown',
    create_time: 32,
    last_login_time: 0,
    last_login_channel: '1',
    roles: ['1', '2'],
  },
  {
    key: '7',
    user: 'John Brown',
    create_time: 32,
    last_login_time: 0,
    last_login_channel: '1',
    roles: ['1', '2'],
  },
]
