import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, SeasonModelLabel, SeasonStatTable } from '../../../../constants/nfl/service.constants';
import { timestampColumn } from '../../../../migrations/models/model.helpers';

export function seasonModelOptions(sequelize: Sequelize): any {
    return {
        modelName: SeasonModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: SeasonStatTable,
        timestamps: false,
    }
}

export function seasonSchema<T>(model: T): any {
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
        season: {
            allowNull: false,
            type: DataTypes.STRING(16),
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
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}

