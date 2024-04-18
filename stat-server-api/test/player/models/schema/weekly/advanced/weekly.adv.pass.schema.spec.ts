import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/weekly/advanced/weekly.adv.pass.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    WeeklyAdvPassModelLabel as ModelLabel, 
    WeeklyAdvPassTable as Table 
} from '@constants/nfl/service.constants';

describe('Weekly Adv Pass Schema', () => {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        username: 'test',
        password: 'testMe',
        database: 'Postgres',
        port: 255,
    });

    const model: Model = null;
    const modelSchema = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        player_weekly_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model,
                key: 'id',
            },
        },
        pass_drops: {
            type: DataTypes.INTEGER,
        },
        pass_drop_pct: {
            type: DataTypes.FLOAT,
        },
        rec_drop: {
            type: DataTypes.INTEGER,
        },
        rec_drop_pct: {
            type: DataTypes.FLOAT,
        },
        bad_throws: {
            type: DataTypes.INTEGER,
        },
        bad_throw_pct: {
            type: DataTypes.FLOAT,
        },
        blitzed: {
            type: DataTypes.INTEGER,
        },
        hurried: {
            type: DataTypes.INTEGER,
        },
        hit: {
            type: DataTypes.INTEGER,
        },
        pressured: {
            type: DataTypes.INTEGER,
        },
        pressured_pct: {
            type: DataTypes.FLOAT,
        },
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.weeklyAdvPassModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.weeklyAdvPassSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});