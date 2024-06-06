import { Sequelize, WhereLeftOperand } from 'sequelize';
import * as db from '@database/database.utils';
import { Col, Where } from 'sequelize/types/utils';

const obj = {}
let mockSequelizeCol: jest.SpyInstance<Col, [col: string], any>;
let mockSequelizeWhere: jest.SpyInstance<Where, [leftOperand: WhereLeftOperand, rightOperand: any], any>;

describe('Database Utils', () => {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        username: 'test',
        password: 'testMe',
        database: 'Postgres',
        port: 255,
    });

    beforeEach(async () => {
        mockSequelizeCol = jest.spyOn(Sequelize.prototype, 'col').mockImplementation();
        mockSequelizeWhere = jest.spyOn(Sequelize.prototype, 'where').mockImplementation();
    });


    describe('twoColumnSeasonJoin', () => {
        it('twoColumnSeasonJoin', () => {
            expect(db.twoColumnSeasonJoin(sequelize, {}, 'src', 'tgt')).toEqual({
                model: {},
                on: {
                    col1: undefined, 
                    col2: undefined 
                },
            });
            expect(mockSequelizeCol).toHaveBeenNthCalledWith(1, 'src.player_id');
            expect(mockSequelizeCol).toHaveBeenNthCalledWith(2, 'tgt.player_id');
            expect(mockSequelizeCol).toHaveBeenNthCalledWith(3, 'src.season');
            expect(mockSequelizeCol).toHaveBeenNthCalledWith(4, 'tgt.season');

            expect(mockSequelizeWhere).toHaveBeenNthCalledWith(1, undefined, '=', undefined);
            expect(mockSequelizeWhere).toHaveBeenNthCalledWith(2, undefined, '=', undefined);
            
        });
    });
});