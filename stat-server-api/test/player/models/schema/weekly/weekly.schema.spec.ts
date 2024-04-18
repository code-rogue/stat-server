import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/weekly/weekly.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    WeeklyModelLabel as ModelLabel, 
    WeeklyStatTable as Table 
} from '@constants/nfl/service.constants';

describe('Weekly Schema', () => {
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
        game_id: {
            type: DataTypes.STRING(32),
        },
        pfr_game_id: {
            type: DataTypes.STRING(32),
        },
        player_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model,
                key: 'id',
            },
        },
        season: {
            allowNull: false,
            type: DataTypes.STRING(16),
        },
        week: {
        allowNull: false,
            type: DataTypes.INTEGER,
        },
        game_type: {
            type: DataTypes.STRING(16),
            defaultValue: 'REG',
        },
        opponent: {
            type: DataTypes.STRING(16),
        },
        fantasy_points: {
            type: DataTypes.FLOAT,
        },
        fantasy_points_ppr: {
            type: DataTypes.FLOAT,
        },
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.weeklyModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.weeklySchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});