import { Pagination, PaginationResult } from '$/pagination';

/**
 * 创建分页查询
 * @param model
 * @param args
 * @param options
 */
export const createPagination = async <T>(model: any, args: any = { where: undefined }, options: Pagination): Promise<PaginationResult<T>> => {
    console.log();
    const page = Number(options?.page) || 1;
    const limit = Number(options?.limit) || 10;

    const skip = page > 0 ? limit * (page - 1) : 0;

    const [total, data] = await Promise.all([
        model.count({ where: args.where }),
        model.findMany({
            ...args,
            skip,
            take: limit,
        }),
    ]);

    const lastPage = Math.ceil(total / limit);

    return {
        rows: data,
        meta: {
            total,
            lastPage,
            currentPage: page,
            limit,
            prev: page > 1 ? page - 1 : 0,
            next: page < lastPage ? page + 1 : 0,
        },
    };
};