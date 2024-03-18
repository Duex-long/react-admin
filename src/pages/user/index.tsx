import { Table, Pagination } from 'antd'
import './index.less'
import { useNameSpace } from '@/utils/hooks'
import { columns, mockData } from './table'
import { useState } from 'react'

const UserManagement = () => {
  const [loadingState, setLoadingState] = useState(false)
  console.log(useNameSpace())
  return (
    <>
      <div className="user">
        <Table
          pagination={false}
          loading={loadingState}
          className="user-table"
          columns={columns}
          dataSource={mockData}
        />
        <Pagination defaultCurrent={1} total={10} />
      </div>
    </>
  )
}

export default UserManagement
