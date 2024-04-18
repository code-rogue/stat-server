import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/weekly/weekly.pass.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    WeeklyPassModelLabel as ModelLabel, 
    WeeklyPassTable as Table 
} from '@constants/nfl/service.constants';

describe('Weekly Pass Schema', () => {
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
        attempts: {
            type: DataTypes.INTEGER,
        },
        completions: {
            type: DataTypes.INTEGER,
        },
        pass_yards: {
            type: DataTypes.FLOAT,
        },
        pass_yards_after_catch: {
            type: DataTypes.FLOAT,
        },
        pass_air_yards: {
            type: DataTypes.FLOAT,
        },
        pass_air_conversion_ratio: {
            type: DataTypes.FLOAT,
        },
        pass_first_downs: {
            type: DataTypes.INTEGER,
        },
        dakota: {
            type: DataTypes.FLOAT,
        },
        pass_epa: {
            type: DataTypes.FLOAT,
        },
        pass_tds: {
            type: DataTypes.INTEGER,
        },
        pass_two_pt_conversions: {
            type: DataTypes.INTEGER,
        },
        interceptions: {
            type: DataTypes.INTEGER,
        },
        sacks: {
            type: DataTypes.FLOAT,
        },
        sack_yards: {
            type: DataTypes.FLOAT,
        },
        sack_fumbles: {
            type: DataTypes.INTEGER,
        },
        sack_fumbles_lost: {
            type: DataTypes.INTEGER,
        },
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.weeklyPassModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.weeklyPassSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});