import { fetchGet, fetchPostJson } from '@/utils/fetch'

export type ListQueryType = {
  pageSize: number
  pageNum: number
}
export type DeleteParams = {
  [x: string]: string
}

export const getModuleList = (namespace: string, params: ListQueryType) =>
  fetchGet(`admin/${namespace}/list`, params)

export const deleteModuleOneItem = (namespace: string, params: DeleteParams) =>
  fetchPostJson(`admin/${namespace}/delete`, params)
