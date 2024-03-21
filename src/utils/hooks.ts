import { getModuleList } from '@/api'
import { useCallback, useEffect, useRef, useState } from 'react'
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

const useTableOptions = (renderFunc: (...args: unknown[]) => JSX.Element) => {
  return {
    title: 'options',
    key: 'options',
    render: renderFunc,
  }
}

const useListData = (namespace: string, pageNum: number, size: number = 5) => {
  const pageSize = size
  const listTotal = useRef(NaN)
  const listLength = useRef(0)
  const [list, setList] = useState([])
  const [loadingState, setLoadingState] = useState(false)
  useEffect(() => {
    const checkRepeatRequest = () => {
      if (isNaN(listTotal.current)) return false
      if (listLength.current == listTotal.current) return true
    }

    const getList = async () => {
      if (checkRepeatRequest()) return
      try {
        setLoadingState(true)
        const response = await getModuleList(namespace, {
          pageNum,
          pageSize,
        })
        const result = await response.json()
        const { total, records } = result.data
        listTotal.current = total
        setList((userList: typeof records) => {
          const list = userList.concat([])
          const start = (pageNum - 1) * pageSize
          const len = records.length
          for (let i = 0; i < len; i++) {
            list[i + start] = records[i]
          }
          listLength.current = list.length
          return list.filter((item: unknown) => item)
        })
      } finally {
        setLoadingState(false)
      }
    }

    getList()
  }, [namespace, pageNum, pageSize])

  return {
    list,
    listTotal,
    loadingState,
  }
}

export { useNameSpace, useRootDocument, useTableOptions, useListData }
