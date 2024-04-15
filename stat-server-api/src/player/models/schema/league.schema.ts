import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, LeagueModelLabel, LeagueTable } from '@constants/nfl/service.constants';
import { timestampColumn } from '@migrations/models/model.helpers';

export function leagueModelOptions(sequelize: Sequelize): any {
    return {
        modelName: LeagueModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: LeagueTable,
        timestamps: false,
    }
}

export function leagueSchema<T>(model: T): any {
    return {
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
        team: {
            type: DataTypes.STRING(8),
        },
        team_seq: {
            type: DataTypes.STRING(8),
        },
        team_id: {
            type: DataTypes.STRING(8),
        },
        rookie_year: {
            type: DataTypes.STRING(4),
        },
        draft_team: {
            type: DataTypes.STRING(8),
        },
        draft_number: {
            type: DataTypes.STRING(4),
        },
        draft_round: {
            type: DataTypes.STRING(4),
        },
        season: {
            type: DataTypes.STRING(4),
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}

