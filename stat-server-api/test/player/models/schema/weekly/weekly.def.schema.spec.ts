import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/weekly/weekly.def.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    WeeklyDefModelLabel as ModelLabel, 
    WeeklyDefTable as Table 
} from '@constants/nfl/service.constants';

describe('Weekly Def Schema', () => {
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
        tackles: {
            type: DataTypes.FLOAT,
        },
        tackles_solo: {
            type: DataTypes.FLOAT,
        },
        tackle_with_assists: {
            type: DataTypes.FLOAT,
        },
        tackle_assists: {
            type: DataTypes.FLOAT,
        },
        tackles_for_loss: {
            type: DataTypes.FLOAT,
        },
        tackles_for_loss_yards: {
            type: DataTypes.FLOAT,
        },
        fumbles_forced: {
            type: DataTypes.FLOAT,
        },
        sacks: {
            type: DataTypes.FLOAT,
        },
        sack_yards: {
            type: DataTypes.FLOAT,
        },
        qb_hits: {
            type: DataTypes.FLOAT,
        },
        interceptions: {
            type: DataTypes.FLOAT,
        },
        interception_yards: {
            type: DataTypes.FLOAT,
        },
        pass_defended: {
            type: DataTypes.FLOAT,
        },
        tds: {
            type: DataTypes.FLOAT,
        },
        fumbles: {
            type: DataTypes.FLOAT,
        },
        fumble_recovery_own: {
            type: DataTypes.FLOAT,
        },
        fumble_recovery_yards_own: {
            type: DataTypes.FLOAT,
        },
        fumble_recovery_opp: {
            type: DataTypes.FLOAT,
        },
        fumble_recovery_yards_opp: {
            type: DataTypes.FLOAT,
        },
        safety: {
            type: DataTypes.FLOAT,
        },
        penalty: {
            type: DataTypes.FLOAT,
        },
        penalty_yards: {
            type: DataTypes.FLOAT,
        },
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.weeklyDefModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.weeklyDefSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});