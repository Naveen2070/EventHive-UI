export interface PageResponse<T> {
  content: Array<T>
  pageable: {
    pageNumber: number
    pageSize: number
  }
  totalElements: number
  totalPages: number
  last: boolean
  first: boolean
}

export interface ApiError {
  status: number
  message: string
  timestamp: string
}
