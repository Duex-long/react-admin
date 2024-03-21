import { Tag } from 'antd'
import dayjs from 'dayjs'

// interface DataType {
//   key: string
//   user: string
//   last_login_time: number
//   last_login_channel: string
//   create_time: number
//   roles: string[]
// }

const customColumnRender = (data: string) => {
  return (
    <>
      <Tag color="geekblue">{data}</Tag>
    </>
  )
}

const dateFormatRender = (data: string) => {
  return <>{dayjs(data).format('YYYY-MM-DD HH:mm:ss')}</>
}

export const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    width: '20%',
  },
  {
    title: 'user',
    dataIndex: 'nickname',
    width: '20%',
  },
  {
    title: 'create_time',
    dataIndex: 'create_time',
    width: '20%',
    render: dateFormatRender,
  },
  {
    title: 'update_time',
    dataIndex: 'update_time',
    width: '20%',
    render: dateFormatRender,
  },

  {
    title: 'roles',
    dataIndex: 'auth',
    width: '20%',
    render: customColumnRender,
  },
]
