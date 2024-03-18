import { useLocation } from 'react-router-dom'

const namespaceReg = /^\/([0-9a-zA-Z])+\//i
const useNameSpace = () => {
  const location = useLocation()
  const { pathname } = location
  const result = pathname.match(namespaceReg)
  return result ? result[0].replace(/\//g, '') : ''
}

export { useNameSpace }
