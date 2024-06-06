import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/season/basic/season.rec.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    SeasonRecModelLabel as ModelLabel, 
    SeasonRecTable as Table 
} from '@constants/nfl/service.constants';

describe('Season Rec Schema', () => {
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
        targets: {
            type: DataTypes.INTEGER,
        },
        receptions: {
            type: DataTypes.INTEGER,
        },
        target_share: {
            type: DataTypes.FLOAT,
        },
        rec_yards: {
            type: DataTypes.FLOAT,
        },
        rec_yards_after_catch: {
            type: DataTypes.FLOAT,
        },
        rec_air_yards: {
            type: DataTypes.FLOAT,
        },
        rec_air_yards_share: {
            type: DataTypes.FLOAT,
        },
        rec_air_conversion_ratio: {
            type: DataTypes.FLOAT,
        },
        weighted_opportunity_rating: {
            type: DataTypes.FLOAT,
        },
        rec_epa: {
            type: DataTypes.FLOAT,
        },
        rec_tds: {
            type: DataTypes.INTEGER,
        },
        rec_two_pt_conversions: {
            type: DataTypes.INTEGER,
        },
        rec_first_downs: {
            type: DataTypes.INTEGER,
        },
        rec_fumbles: {
            type: DataTypes.INTEGER,
        },
        rec_fumbles_lost: {
            type: DataTypes.INTEGER,
        },
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.seasonRecModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.seasonRecSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});