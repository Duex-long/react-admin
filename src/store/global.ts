import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
dayjs().format()

const cuttentTime = new Date().getTime()
export const globalSlice = createSlice({
  name: 'globalData',
  initialState: {
    startTime: dayjs(cuttentTime - 86400000 * 7).format('YYYY-MM-DD'),
    endTime: dayjs(cuttentTime).format('YYYY-MM-DD'),
  },
  reducers: {
    changeDate: (state, action) => {
      const { payload } = action
      state.startTime = dayjs(payload[0]).format('YYYY-MM-DD')
      state.endTime = dayjs(payload[1]).format('YYYY-MM-DD')
    },
  },
})

export const { changeDate } = globalSlice.actions
