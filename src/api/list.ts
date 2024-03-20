import { fetchGet } from '@/utils/fetch'

export type ListQueryType = {
  pageSize: number
  pageNum: number
}
export const getModuleList = (namespace: string, params: ListQueryType) =>
  fetchGet(`admin/${namespace}/list`, params)
