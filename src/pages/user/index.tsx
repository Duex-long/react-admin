import { Space, Table } from 'antd'
import './index.less'
import { columns } from './table-data'
import { useState } from 'react'
import { DeleteButton, DeleteState, OptionHeader } from '@/common/table'
import { useListData, useTableOptions } from '@/utils/hooks'

const UserManagement = () => {
  const pageSize = 5
  const [pageNum, setPageNum] = useState(1)
  const {
    list: userList,
    listTotal,
    loadingState,
  } = useListData('user', pageNum, pageSize)

  const submitInfo = (val: unknown) => {
    console.log('接收', val)
  }

  const deleteCallback = (e: DeleteState) => {
    console.log('deleteCallback', e)
  }

  const paginationChange = (num: number) => {
    setPageNum(num)
  }

  const optionsRender = useTableOptions((record) => {
    const { id } = record as { [x: string]: string }
    return (
      <Space size="middle">
        <DeleteButton id={id} deleteCallback={deleteCallback} />
      </Space>
    )
  })

  return (
    <>
      <div className="user">
        <OptionHeader finshHandler={submitInfo} />
        <Table
          bordered
          pagination={{
            pageSize,
            total: listTotal.current,
            current: pageNum,
            onChange: paginationChange,
          }}
          loading={loadingState}
          className="user-table"
          columns={[...columns, optionsRender]}
          dataSource={userList}
          rowKey="id"
        />
      </div>
    </>
  )
}

export default UserManagement
