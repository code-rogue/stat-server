import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, SeasonAdvRushModelLabel, SeasonAdvRushTable } from '../../../../../constants/nfl/service.constants';
import { timestampColumn } from '../../../../../migrations/models/model.helpers';

export function seasonAdvRushModelOptions(sequelize: Sequelize): any {
    return {
        modelName: SeasonAdvRushModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: SeasonAdvRushTable,
        timestamps: false,
    }
}

export function seasonAdvRushSchema<T>(model: T): any {
    return {
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
        yards: {
            type: DataTypes.FLOAT,
        },
        tds: {
            type: DataTypes.FLOAT,
        },
        longest_rush: {
            type: DataTypes.FLOAT,
        },
        yards_before_contact: {
            type: DataTypes.FLOAT,
        },
        yards_before_contact_avg: {
            type: DataTypes.FLOAT,
        },
        yards_after_contact: {
            type: DataTypes.FLOAT,
        },
        yards_after_contact_avg: {
            type: DataTypes.FLOAT,
        },
        broken_tackles: {
            type: DataTypes.INTEGER,
        },
        broken_tackles_avg: {
            type: DataTypes.FLOAT,
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}