import { ApiProperty } from '@nestjs/swagger';

const DEFAULT_LIMIT = 50;

export type WhereClause = {
    [key: string]: {
        [key: string]: string;
    }
};

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
  }

export class BaseDto {
    id?: number;
    @ApiProperty({ 
      required: false,
      description: 'Filter by a comma separated list of ids' 
    })
    ids?: string;
    @ApiProperty({ required: false })
    sort?: string[];
    @ApiProperty({ enum: SortDirection, enumName: 'Sort Direction', required: false })
    sort_direction?: SortDirection;
}

export class PaginationDto extends BaseDto {
    @ApiProperty({ required: false })
    offset?: number;
    @ApiProperty({ required: false })
    limit?: number;
}

export class BaseAPI {
    id?: number;
    ids?: string[];
    public sort?: string[];
    public sort_direction: SortDirection;

    constructor(options: BaseDto) {
        this.id = options.id;
        this.ids = options.ids?.split(',') ?? [];
      
        if(options.sort) {
            if(Array.isArray(options.sort))
                this.sort = options.sort;
            else
                this.sort = [options.sort];
        }
        this.sort_direction = options.sort_direction ?? SortDirection.ASC;
    }

    public buildOrderByClause(defaultSort: string[]): any {
        let clause = [];
        let sort = this.sort ?? defaultSort;
    
        sort.forEach(value => {
            clause.push([value, this.sort_direction]);
        })

        return clause;
    }
}

export class PaginationAPI extends BaseAPI {
    public offset: number;
    public limit: number;

    constructor(options: PaginationDto) {
        super(options);
        this.limit = options.limit ?? DEFAULT_LIMIT;
        const page = options.offset ?? 1;
        this.offset = (page - 1) * this.limit;
    }
}

