import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'

const namespaceReg = /^\/([0-9a-zA-Z])+\//i
const useNameSpace = () => {
  const location = useLocation()
  const { pathname } = location
  const result = pathname.match(namespaceReg)
  return result ? result[0].replace(/\//g, '') : ''
}

const useRootDocument = () => {
  return useCallback(() => {
    return document.getElementById('root') as HTMLElement
  }, [])
}

export { useNameSpace, useRootDocument }
