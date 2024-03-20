import { Table } from 'antd'
import './index.less'
import { columns, mockData } from './table-data'
import { useEffect, useState } from 'react'
import { OptionHeader } from '@/common/table'
import { ListQueryType, getModuleList } from '@/api'

const UserManagement = () => {
  const [loadingState, setLoadingState] = useState(false)
  const [pageSize, setPageSize] = useState(6)
  const [pageNum, setPageNum] = useState(1)
  const [total, setTotal] = useState(0)
  const [userList, setUserList] = useState([])

  const submitInfo = (val: unknown) => {
    console.log('接收', val)
  }
  const getUserList = async (query: ListQueryType) => {
    try {
      setLoadingState(true)
      const response = await getModuleList('user', query)
      const result = await response.json()
      const { total, record } = result.data
      setTotal(total)
      setUserList(record)
      console.log(result, 'result')
    } finally {
      setLoadingState(false)
    }
  }

  useEffect(() => {
    getUserList({ pageSize, pageNum })
  }, [pageSize, pageNum])
  return (
    <>
      <div className="user">
        <OptionHeader finshHandler={submitInfo} />
        <Table
          bordered
          pagination={{ pageSize, total, current: pageNum }}
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
