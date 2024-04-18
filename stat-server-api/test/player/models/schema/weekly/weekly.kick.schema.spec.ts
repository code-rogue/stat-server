import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/weekly/weekly.kick.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    WeeklyKickModelLabel as ModelLabel, 
    WeeklyKickTable as Table 
} from '@constants/nfl/service.constants';

describe('Weekly Kick Schema', () => {
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
        fg_att: {
            type: DataTypes.INTEGER,
        },
        fg_made: {
            type: DataTypes.INTEGER,
        },
        fg_missed: {
            type: DataTypes.INTEGER,
        },
        fg_blocked: {
            type: DataTypes.INTEGER,
        },
        fg_pct: {
            type: DataTypes.FLOAT,
        },
        fg_long: {
            type: DataTypes.FLOAT,
        },
        fg_made_0_19: {
            type: DataTypes.INTEGER,
        },
        fg_made_20_29: {
            type: DataTypes.INTEGER,
        },
        fg_made_30_39: {
            type: DataTypes.INTEGER,
        },
        fg_made_40_49: {
            type: DataTypes.INTEGER,
        },
        fg_made_50_59: {
            type: DataTypes.INTEGER,
        },
        fg_made_60_: {
            type: DataTypes.INTEGER,
        },
        fg_missed_0_19: {
            type: DataTypes.INTEGER,
        },
        fg_missed_20_29: {
            type: DataTypes.INTEGER,
        },
        fg_missed_30_39: {
            type: DataTypes.INTEGER,
        },
        fg_missed_40_49: {
            type: DataTypes.INTEGER,
        },
        fg_missed_50_59: {
            type: DataTypes.INTEGER,
        },
        fg_missed_60_: {
            type: DataTypes.INTEGER,
        },
        fg_made_distance: {
            type: DataTypes.FLOAT,
        },
        fg_missed_distance: {
            type: DataTypes.FLOAT,
        },
        fg_blocked_distance: {
            type: DataTypes.FLOAT,
        },
        fg_made_list: {
            type: DataTypes.STRING(64),
        },
        fg_missed_list: {
            type: DataTypes.STRING(64),
        },
        fg_blocked_list: {
        type: DataTypes.STRING(64),
        },
        gwfg_att: {
            type: DataTypes.INTEGER,
        },
        gwfg_distance: {
            type: DataTypes.FLOAT,
        },
        gwfg_made: {
            type: DataTypes.INTEGER,
        },
        gwfg_missed: {
            type: DataTypes.INTEGER,
        },
        gwfg_blocked: {
            type: DataTypes.INTEGER,
        },
        pat_att: {
            type: DataTypes.INTEGER,
        },
        pat_made: {
            type: DataTypes.INTEGER,
        },
        pat_missed: {
            type: DataTypes.INTEGER,
        },
        pat_blocked: {
            type: DataTypes.INTEGER,
        },
        pat_pct: {
            type: DataTypes.FLOAT,
        },
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.weeklyKickModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.weeklyKickSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});