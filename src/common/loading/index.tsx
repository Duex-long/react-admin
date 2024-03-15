import './loading.less'
import store from '@/store'
import { Spin } from 'antd'
import { useSelector } from 'react-redux'

const LoadingIcon = () => {
  const loadingState = useSelector(
    (state: ReturnType<typeof store.getState>) => state.loading.loadingState
  )

  return (
    <div className={'loading' + (loadingState ? '' : ' hidden')}>
      <Spin size="large" />
    </div>
  )
}

export default LoadingIcon
