import store from '@/store'
import './index.less'
import { DatePicker } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import dayjs, { Dayjs } from 'dayjs'
import { changeDate } from '@/store/global'
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

export default GlobalHeader
