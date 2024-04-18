import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/season/advanced/season.adv.pass.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema, 
    SeasonAdvPassModelLabel as ModelLabel, 
    SeasonAdvPassTable as Table 
} from '@constants/nfl/service.constants';

describe('Season Advanced Pass Schema', () => {
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
        throw_aways: {
            type: DataTypes.INTEGER,
        },
        spikes: {
            type: DataTypes.INTEGER,
        },
        drops: {
            type: DataTypes.INTEGER,
        },
        drop_pct: {
            type: DataTypes.FLOAT,
        },
        bad_throws: {
            type: DataTypes.INTEGER,
        },
        bad_throw_pct: {
            type: DataTypes.FLOAT,
        },
        pocket_time: {
            type: DataTypes.FLOAT,
        },
        blitzed: {
            type: DataTypes.INTEGER,
        },
        hurried: {
            type: DataTypes.INTEGER,
        },
        hit: {
            type: DataTypes.INTEGER,
        },
        pressured: {
            type: DataTypes.INTEGER,
        },
        pressured_pct: {
            type: DataTypes.FLOAT,
        },
        batted_balls: {
            type: DataTypes.INTEGER,
        },
        on_tgt_throws: {
            type: DataTypes.INTEGER,
        },
        on_tgt_throws_pct: {
            type: DataTypes.FLOAT,
        },
        rpo_plays: {
            type: DataTypes.INTEGER,
        },
        rpo_yards: {
            type: DataTypes.FLOAT,
        },
        rpo_pass_attempts: {
            type: DataTypes.FLOAT,
        },
        rpo_pass_yards: {
            type: DataTypes.FLOAT,
        },
        rpo_rush_attempts: {
            type: DataTypes.FLOAT,
        },
        rpo_rush_yards: {
            type: DataTypes.FLOAT,
        },
        pa_pass_attempts: {
            type: DataTypes.FLOAT,
        },
        pa_pass_yards: {
            type: DataTypes.FLOAT,
        },
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.seasonAdvPassModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.seasonAdvPassSchema(model)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});