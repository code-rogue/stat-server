import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/weekly/weekly.rush.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    WeeklyRushModelLabel as ModelLabel, 
    WeeklyRushTable as Table 
} from '@constants/nfl/service.constants';

describe('Weekly Rush Schema', () => {
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
        carries: {
            type: DataTypes.INTEGER,
        },
        rush_yards: {
            type: DataTypes.FLOAT,
        },
        rush_first_downs: {
          type: DataTypes.INTEGER,
        },
        rush_epa: {
          type: DataTypes.FLOAT,
        },
        rush_tds: {
            type: DataTypes.INTEGER,
        },
        rush_two_pt_conversions: {
          type: DataTypes.INTEGER,
        },
        rush_fumbles: {
            type: DataTypes.INTEGER,
        },
        rush_fumbles_lost: {
            type: DataTypes.INTEGER,
        },
        special_teams_tds: {
          type: DataTypes.INTEGER,
        },
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.weeklyRushModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.weeklyRushSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});