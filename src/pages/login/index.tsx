import { getRandomRGBA } from '../../utils/random'
import { Button, Input, message } from 'antd'
import './login.less'
import { ChangeEventHandler, ReactNode, useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeState } from '../../store/loading'
import JsEncrypt from 'jsencrypt'
import { md5 } from 'js-md5'
import uuidv4 from 'uuid-random'
import { fetchGet, fetchPostJson } from '../../utils/fetch'
import { setToken, setUserId } from '../../utils/token'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  return (
    <div className="login">
      <LoginForm />
      <ColumnBackground />
    </div>
  )
}

const ColumnItem = ({ index }: { index: number }) => {
  const animationName = index % 2 ? 'slideInTopClass' : 'slideInBottomClass'
  return (
    <div
      className={'login-column ' + animationName}
      style={{ background: getRandomRGBA() }}
    ></div>
  )
}

const ColumnBackground = () => {
  return (
    <div className="login-bg">
      {Array(15)
        .fill(0)
        .map((_, idx) => (
          <ColumnItem index={idx} key={idx} />
        ))}
    </div>
  )
}

// 加密
const getCacheKey = () => uuidv4()

const getPublicKey = async (cacheKey: string): Promise<string> => {
  const res = await fetchGet('admin/user/getPublicKey', { cacheKey })
  const { data } = await res.json()
  return data
}
const rsaEncrypt = (publicKey: string, target: string) => {
  const myEncrypt = new JsEncrypt()
  const md5Target = md5(target)
  myEncrypt.setPublicKey(publicKey)
  const result = myEncrypt.encrypt(md5Target)
  return result || ''
}

const LoginForm = () => {
  const dispach = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const checkFormIsEmpty = () => {
    let check = false
    !password
      ? messageApi.error('请输入用户名')
      : !password
      ? messageApi.error('请输入密码')
      : (check = true)
    return check
  }

  const loginClick = async () => {
    const allowNext = checkFormIsEmpty()
    if (!allowNext) return
    dispach(changeState(true))
    const cacheKey = getCacheKey()
    try {
      const publicKey = await getPublicKey(cacheKey)
      if (publicKey) {
        const encryptPassword = rsaEncrypt(publicKey, password)
        if (!encryptPassword) {
          throw Error('加密错误')
        }
        const userInfo = {
          username,
          password: encryptPassword,
          cacheKey,
        }
        const loginResponse = await fetchPostJson('admin/user/login', userInfo)
        const data = await loginResponse.json()
        if (data.message) {
          throw Error(data.message)
        }
        const token = data.data.token
        setToken(token)
        setUserId(username)
        navigate('/', {
          replace: true,
        })
      }
    } catch (e) {
      console.log('捕获错误')
      messageApi.error('登陆失败')
      setPassword('')
    } finally {
      dispach(changeState(false))
    }
  }

  const usernameInsertHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    setUsername(value)
  }
  const passwordInsertHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    setPassword(value)
  }
  return (
    <div className="login-form">
      {contextHolder}
      <div className="login-form-opt">
        <div className="opt-title">Get Started</div>
        <div className="opt-tips">请找管理员申请账号</div>
        <div className="opt-insert">
          <InputComponent>
            <Input
              size="large"
              placeholder="Enter your username"
              onChange={usernameInsertHandler}
              value={username}
            />
          </InputComponent>

          <InputComponent>
            <Input
              size="large"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={passwordInsertHandler}
            />
          </InputComponent>

          <InputComponent>
            <Button
              onClick={loginClick}
              type="primary"
              size="large"
              block
              children={'Sign Up'}
            />
          </InputComponent>
        </div>
      </div>
      <div className="login-form-show"></div>
    </div>
  )
}

const InputComponent = ({ children }: { children: ReactNode }) => {
  return <div className="input-custom">{children}</div>
}
