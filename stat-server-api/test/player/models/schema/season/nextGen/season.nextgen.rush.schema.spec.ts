import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/season/nextGen/season.nextgen.rush.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    SeasonNextGenRushModelLabel as ModelLabel, 
    SeasonNextGenRushTable as Table 
} from '@constants/nfl/service.constants';

describe('Season NextGen Rush Schema', () => {
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
        efficiency: {
            type: DataTypes.FLOAT,
        },
        attempts_gte_eight_defenders_pct: {
            type: DataTypes.FLOAT,
        },
        avg_time_to_los: {
            type: DataTypes.FLOAT,
        },
        expected_yards: {
            type: DataTypes.FLOAT,
        },
        yards_over_expected: {
            type: DataTypes.FLOAT,
        },
        avg_yards: {
            type: DataTypes.FLOAT,
        },
        yards_over_expected_per_att: {
            type: DataTypes.FLOAT,
        },
        yards_over_expected_pct: {
            type: DataTypes.FLOAT,
        },
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.seasonNextGenRushModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.seasonNextGenRushSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});