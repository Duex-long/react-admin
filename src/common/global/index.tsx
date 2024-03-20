import store from '@/store'
import './index.less'
import { Avatar, Badge, DatePicker, Drawer, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons'

import dayjs from 'dayjs'
import { changeDate } from '@/store/global'
import { MouseEventHandler, useState } from 'react'
import { fetchPostJson } from '@/utils/fetch'
import { removeToken, removeUserId } from '@/utils/token'
const { RangePicker } = DatePicker

const GlobalHeader = () => {
  const dispach = useDispatch()
  const globalDate = useSelector((state: ReturnType<typeof store.getState>) => {
    return state.global
  })

  const rangeChange = (
    _: [dayjs.Dayjs | null, dayjs.Dayjs | null],
    dateStrings: [string, string]
  ) => {
    dispach(changeDate(dateStrings))
  }
  return (
    <div className="header-prototype">
      <div className="date-select">
        <RangePicker
          value={[dayjs(globalDate.startTime), dayjs(globalDate.endTime)]}
          onChange={rangeChange}
        />
      </div>
    </div>
  )
}

const GlobalUserInfo = () => {
  const [drawerState, setDrawerState] = useState(false)
  const onClose = () => {
    setDrawerState(false)
  }

  const logout: MouseEventHandler<HTMLSpanElement> = async (e) => {
    e.stopPropagation()
    await fetchPostJson('admin/user/logout')
    removeToken()
    removeUserId()
  }

  return (
    <>
      <div className="user-prototype" onClick={() => setDrawerState(true)}>
        <Badge>
          <Space size="middle">
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
            <span className="user-prototype-name">USERNAME</span>
            <PoweroffOutlined onClick={logout} />
          </Space>
        </Badge>
      </div>

      <Drawer title="User Drawer" onClose={onClose} open={drawerState} />
    </>
  )
}

export { GlobalHeader, GlobalUserInfo }
