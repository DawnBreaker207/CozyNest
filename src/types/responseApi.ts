export interface ResAPI<T> {
  res: T
  pagination?: {
    currentPage?: number
    totalPages?: number
    totalItems?: number
  }
}

export type IQuery = {
  _order: string
  _sort: string
  _page: number | string
  _limit: number
  _category: number
  _id: string | null
}
