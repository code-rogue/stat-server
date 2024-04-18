import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/weekly/advanced/weekly.adv.rec.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    WeeklyAdvRecModelLabel as ModelLabel, 
    WeeklyAdvRecTable as Table 
} from '@constants/nfl/service.constants';

describe('Weekly Adv Rec Schema', () => {
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
        broken_tackles: {
            type: DataTypes.INTEGER,
        },
        drops: {
            type: DataTypes.INTEGER,
        },
        drop_pct: {
            type: DataTypes.FLOAT,
        },
        interceptions: {
            type: DataTypes.INTEGER,
        },
        qb_rating: {
            type: DataTypes.FLOAT,
        },
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.weeklyAdvRecModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.weeklyAdvRecSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});