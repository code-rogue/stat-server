import * as m from '@migrations/models/model.helpers';
import * as schema from '@player/models/schema/league.schema';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { NFLSchema, LeagueModelLabel as ModelLabel, LeagueTable as Table } from '@constants/nfl/service.constants';

describe('Play League Schema', () => {
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
            references: {
                model: teamModel,
                key: 'id',
            },
        },
        position_group: {
            type: DataTypes.STRING(16),
        },
        position: {
            type: DataTypes.STRING(16),
        },
        jersey_number: {
            type: DataTypes.INTEGER,
        },
        years_of_experience: {
            type: DataTypes.INTEGER,
        },
        rookie_year: {
            type: DataTypes.STRING(4),
        },
        draft_team_id: {
            type: DataTypes.INTEGER,
            references: {
                model: teamModel,
                key: 'id',
            },
        },
        draft_number: {
            type: DataTypes.STRING(4),
        },
        draft_round: {
            type: DataTypes.STRING(4),
        },
        season: {
            type: DataTypes.INTEGER,
        },
        created_date: '',
        last_modified: '',
    };

    describe('bioModelOptions', () => {
        it('should return schema model options', () => {
            expect(schema.leagueModelOptions(sequelize)).toEqual({
                modelName: ModelLabel,
                schema: NFLSchema,
                sequelize: sequelize,
                tableName: Table,
                timestamps: false,
            });
        });

        it('should return model schema', () => {
            const mockTimestampColumn = jest.spyOn(m, 'timestampColumn').mockImplementation(() => '');
            expect(schema.leagueSchema(model, teamModel)).toEqual(modelSchema);
            expect(mockTimestampColumn).toHaveBeenCalledTimes(2);
            mockTimestampColumn.mockRestore();
        });
    });
});