import './index.less'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const ReloadPage = () => {
  const navigate = useNavigate()
  const reloadPage = () => {
    navigate('/', {
      replace: true,
    })
  }
  return (
    <>
      <div className="index-reload-page">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page info is not found."
          extra={
            <Button onClick={reloadPage} type="primary">
              Reload Page
            </Button>
          }
        />
      </div>
    </>
  )
}

export default ReloadPage
