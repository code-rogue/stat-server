import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/season/advanced/season.adv.rec.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    SeasonAdvRecModelLabel as ModelLabel, 
    SeasonAdvRecTable as Table 
} from '@constants/nfl/service.constants';

describe('Season Advanced Rec Schema', () => {
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
        yards: {
            type: DataTypes.FLOAT,
        },
        tds: {
            type: DataTypes.FLOAT,
        },
        longest_rec: {
            type: DataTypes.FLOAT,
        },
        air_yards: {
            type: DataTypes.FLOAT,
        },
        air_yards_avg: {
            type: DataTypes.FLOAT,
        },
        yards_after_contact: {
            type: DataTypes.FLOAT,
        },
        yards_after_contact_avg: {
            type: DataTypes.FLOAT,
        },
        adot: {
            type: DataTypes.FLOAT,
        },
        broken_tackles: {
            type: DataTypes.INTEGER,
        },
        broken_tackles_avg: {
            type: DataTypes.FLOAT,
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
            expect(schema.seasonAdvRecModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.seasonAdvRecSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});