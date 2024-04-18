import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/weekly/advanced/weekly.adv.rush.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    WeeklyAdvRushModelLabel as ModelLabel, 
    WeeklyAdvRushTable as Table 
} from '@constants/nfl/service.constants';

describe('Weekly Adv Rush Schema', () => {
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
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.weeklyAdvRushModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.weeklyAdvRushSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});