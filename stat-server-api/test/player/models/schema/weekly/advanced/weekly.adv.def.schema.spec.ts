import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/weekly/advanced/weekly.adv.def.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    WeeklyAdvDefModelLabel as ModelLabel, 
    WeeklyAdvDefTable as Table 
} from '@constants/nfl/service.constants';

describe('Weekly Adv Def Schema', () => {
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
        interceptions: {
            type: DataTypes.INTEGER,
        },
        targets: {
            type: DataTypes.INTEGER,
        },
        completions_allowed: {
            type: DataTypes.INTEGER,
        },
        completion_pct: {
            type: DataTypes.FLOAT,
        },
        yards_allowed: {
            type: DataTypes.FLOAT,
        },
        yards_allowed_per_cmp: {
            type: DataTypes.FLOAT,
        },
        yards_allowed_per_tgt: {
            type: DataTypes.FLOAT,
        },
        rec_td_allowed: {
            type: DataTypes.INTEGER,
        },
        passer_rating_allowed: {
            type: DataTypes.FLOAT,
        },
        adot: {
            type: DataTypes.FLOAT,
        },
        air_yards_completed: {
            type: DataTypes.FLOAT,
        },
        yards_after_catch: {
            type: DataTypes.FLOAT,
        },
        blitzed: {
            type: DataTypes.INTEGER,
        },
        hurried: {
            type: DataTypes.INTEGER,
        },
        pressures: {
            type: DataTypes.FLOAT,
        },
        tackles_combined: {
            type: DataTypes.FLOAT,
        },
        tackles_missed: {
            type: DataTypes.FLOAT,
        },
        tackles_missed_pct: {
            type: DataTypes.FLOAT,
        },
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.weeklyAdvDefModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.weeklyAdvDefSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});