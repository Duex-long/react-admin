import { Table } from 'antd'
import './index.less'
import { columns, mockData } from './table-data'
import { useState } from 'react'
import { OptionHeader } from '@/common/table'

const UserManagement = () => {
  const [loadingState, setLoadingState] = useState(false)
  const submitInfo = (val: unknown) => {
    console.log('接收', val)
  }
  return (
    <>
      <div className="user">
        <OptionHeader finshHandler={submitInfo} />
        <Table
          bordered
          pagination={{ pageSize: 7 }}
          loading={loadingState}
          className="user-table"
          columns={columns}
          dataSource={mockData}
        />
      </div>
    </>
  )
}

export default UserManagement
