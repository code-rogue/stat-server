import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/season/nextGen/season.nextgen.pass.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    SeasonNextGenPassModelLabel as ModelLabel, 
    SeasonNextGenPassTable as Table 
} from '@constants/nfl/service.constants';

describe('Season NextGen Pass Schema', () => {
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
        player_season_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model,
                key: 'id',
            },
        },
        aggressiveness: {
            type: DataTypes.FLOAT,
        },
        avg_time_to_throw: {
            type: DataTypes.FLOAT,
        },
        avg_air_distance: {
            type: DataTypes.FLOAT,
        },
        max_air_distance: {
            type: DataTypes.FLOAT,
        },
        avg_completed_air_yards: {
            type: DataTypes.FLOAT,
        },
        avg_intended_air_yards: {
            type: DataTypes.FLOAT,
        },
        avg_air_yards_differential: {
            type: DataTypes.FLOAT,
        },
        avg_air_yards_to_sticks: {
            type: DataTypes.FLOAT,
        },
        max_completed_air_distance: {
            type: DataTypes.FLOAT,
        },
        passer_rating: {
            type: DataTypes.FLOAT,
        },
        completion_pct: {
            type: DataTypes.FLOAT,
        },
        expected_completion_pct: {
            type: DataTypes.FLOAT,
        },
        completions_above_expectation_pct: {
            type: DataTypes.FLOAT,
        },
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.seasonNextGenPassModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.seasonNextGenPassSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});