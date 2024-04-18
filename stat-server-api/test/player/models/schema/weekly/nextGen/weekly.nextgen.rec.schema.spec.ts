import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/weekly/nextGen/weekly.nextgen.rec.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    WeeklyNextGenRecModelLabel as ModelLabel, 
    WeeklyNextGenRecTable as Table 
} from '@constants/nfl/service.constants';

describe('Weekly NextGen Rec Schema', () => {
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
        avg_cushion: {
            type: DataTypes.FLOAT,
        },
        avg_separation: {
            type: DataTypes.FLOAT,
        },
        avg_intended_air_yards: {
            type: DataTypes.FLOAT,
        },
        catch_pct: {
          type: DataTypes.FLOAT,
        },
        share_of_intended_air_yards_pct: {
            type: DataTypes.FLOAT,
        },
        avg_yac: {
            type: DataTypes.FLOAT,
        },
        avg_expected_yac: {
            type: DataTypes.FLOAT,
        },
        avg_yac_above_expectation: {
            type: DataTypes.FLOAT,
        },
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.weeklyNextGenRecModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.weeklyNextGenRecSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});