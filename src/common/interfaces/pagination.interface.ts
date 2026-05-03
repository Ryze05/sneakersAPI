export interface PaginatedResponse<T> {
    data: T[],
    total: number,
    limit: number,
    offset: number,
    currentPage: number,
    lastPage: number
}