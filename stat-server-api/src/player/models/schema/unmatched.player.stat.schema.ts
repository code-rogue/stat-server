import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, UnmatchedPlayerStatModelLabel, UnmatchedPlayerStatsTable } from '../../../constants/nfl/service.constants';
import { Team } from '../../../migrations/models/nfl.team.model';
import { timestampColumn } from '../../../migrations/models/model.helpers';

export function unmatchedPlayerStatModelOptions(sequelize: Sequelize): any {
    return {
        modelName: UnmatchedPlayerStatModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: UnmatchedPlayerStatsTable,
        timestamps: false,
    }
}

export function unmatchedPlayerStatSchema(): any {
    return {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        esb_id: {
            type: DataTypes.STRING(128),
        },
        gsis_id: {
            type: DataTypes.STRING(128),
        },
        gsis_it_id: {
            type: DataTypes.STRING(128),
        },
        smart_id: {
            type: DataTypes.STRING(128),
        },
        pfr_id: {
            type: DataTypes.STRING(128),
        },
        full_name: {
            type: DataTypes.STRING(128),
        },
        stat_service: {
            type: DataTypes.STRING(128),
        },
        season: {
            type: DataTypes.INTEGER,
        },
        week: {
            type: DataTypes.INTEGER,
        },
        team_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Team,
                key: 'id',
            },
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}

