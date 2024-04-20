import { SortDirection } from '@interfaces/enums/app.enums';
import BaseDto from '@interfaces/base.dto';

export default class BaseAPI {
    id?: number;
    ids?: string[];
    public sort?: string[];
    public sort_direction: SortDirection;

    constructor(options: BaseDto) {
        this.id = options.id;
        this.ids = options.ids?.split(',') ?? [];
      
        if(options?.sort) {
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