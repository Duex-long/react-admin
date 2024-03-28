import { Space, Table } from 'antd'
import './index.less'
import { columns } from './table-data'
import { useState } from 'react'
import { DeleteButton, DeleteState, OptionHeader } from '@/common/table'
import { useListData, useTableOptions } from '@/utils/hooks'

const CommonManagement = ({ namespace }: { namespace: string }) => {
  const pageSize = 5
  const [pageNum, setPageNum] = useState(1)
  const {
    list: userList,
    listTotal,
    loadingState,
    getList: getUserList,
  } = useListData(namespace, pageNum, pageSize)

  const submitInfo = (val: unknown) => {
    console.log('接收', val)
  }

  const deleteCallback = (e: DeleteState) => {
    console.log('deleteCallback', e)
    // 判断
    if (listTotal.current % pageSize == 1 && pageNum > 1) {
      setPageNum((oldValue) => oldValue--)
    } else {
      getUserList()
    }
  }

  const paginationChange = (num: number) => {
    console.log('paginationChange')
    setPageNum(num)
  }

  const optionsRender = useTableOptions((record) => {
    const { id } = record as { [x: string]: string }
    return (
      <Space size="middle">
        <DeleteButton
          namespace={namespace}
          id={id}
          deleteCallback={deleteCallback}
        />
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

export default CommonManagement
