import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/season/advanced/season.adv.rush.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    SeasonAdvRushModelLabel as ModelLabel, 
    SeasonAdvRushTable as Table 
} from '@constants/nfl/service.constants';

describe('Season Advanced Rush Schema', () => {
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
        attempts: {
            type: DataTypes.INTEGER,
        },
        yards: {
            type: DataTypes.FLOAT,
        },
        tds: {
            type: DataTypes.FLOAT,
        },
        longest_rush: {
            type: DataTypes.FLOAT,
        },
        yards_before_contact: {
            type: DataTypes.FLOAT,
        },
        yards_before_contact_avg: {
            type: DataTypes.FLOAT,
        },
        yards_after_contact: {
            type: DataTypes.FLOAT,
        },
        yards_after_contact_avg: {
            type: DataTypes.FLOAT,
        },
        broken_tackles: {
            type: DataTypes.INTEGER,
        },
        broken_tackles_avg: {
            type: DataTypes.FLOAT,
        },
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.seasonAdvRushModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.seasonAdvRushSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});