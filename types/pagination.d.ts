export interface Pagination {
    page: number;
    limit: number;
}

export interface PaginationResult {
    rows: any[];
    meta: {
        total: number,
        lastPage: number,
        currentPage: number,
        limit: number,
        prev: number,
        next: number,
    };
}