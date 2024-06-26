import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, WeeklyModelLabel, WeeklyStatTable } from '../../../../constants/nfl/service.constants';
import { timestampColumn } from '../../../../migrations/models/model.helpers';

export function weeklyModelOptions(sequelize: Sequelize): any {
    return {
        modelName: WeeklyModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: WeeklyStatTable,
        timestamps: false,
    }
}

export function weeklySchema<T, U>(model: T, teamModel: U): any {
    return {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        game_id: {
            type: DataTypes.STRING(32),
        },
        pfr_game_id: {
            type: DataTypes.STRING(32),
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
        opponent_id: {
            type: DataTypes.INTEGER,
            references: {
                model: teamModel,
                key: 'id',
            },
        },
        season: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        week: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        game_type: {
            type: DataTypes.STRING(16),
            defaultValue: 'REG',
        },
        fantasy_points: {
            type: DataTypes.FLOAT,
        },
        fantasy_points_ppr: {
            type: DataTypes.FLOAT,
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}

