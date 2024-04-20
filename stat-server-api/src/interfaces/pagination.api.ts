import BaseAPI from '@interfaces/base.api';
import PaginationDto from '@interfaces/pagination.dto';

export const DEFAULT_LIMIT = 50;

export default class PaginationAPI extends BaseAPI {
    public offset: number;
    public limit: number;

    constructor(options: PaginationDto) {
        super(options);
        this.limit = options.limit ?? DEFAULT_LIMIT;
        const page = options.offset ?? 1;
        this.offset = (page - 1) * this.limit;
    }
}

