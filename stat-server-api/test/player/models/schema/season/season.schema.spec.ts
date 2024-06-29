import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/season/season.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { 
    NFLSchema,
    SeasonModelLabel as ModelLabel, 
    SeasonStatTable as Table 
} from '@constants/nfl/service.constants';

describe('Season Schema', () => {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        username: 'test',
        password: 'testMe',
        database: 'Postgres',
        port: 255,
    });

    const model: Model = null;
    const teamModel: Model = null;
    const modelSchema = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        player_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model,
                key: 'id',
            },
        },
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: teamModel,
                key: 'id',
            },
        },
        season: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        age: {
            type: DataTypes.INTEGER,
        },
        games_played: {
            type: DataTypes.INTEGER,
        },
        games_started: {
            type: DataTypes.INTEGER,
        },
        fantasy_points: {
            type: DataTypes.FLOAT,
        },
        fantasy_points_ppr: {
            type: DataTypes.FLOAT,
        },
        created_date: '',
        last_modified: '',
    };

    describe('Model Schema', () => {
        it('should return schema model options', () => {
            expect(schema.seasonModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.seasonSchema(model, teamModel)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});