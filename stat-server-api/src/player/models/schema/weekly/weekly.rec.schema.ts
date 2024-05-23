import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, WeeklyRecModelLabel, WeeklyRecTable } from '../../../../constants/nfl/service.constants';
import { timestampColumn } from '../../../../migrations/models/model.helpers';

export function weeklyRecModelOptions(sequelize: Sequelize): any {
    return {
        modelName: WeeklyRecModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: WeeklyRecTable,
        timestamps: false,
    }
}

export function weeklyRecSchema<T>(model: T): any {
    return {
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
        targets: {
            type: DataTypes.INTEGER,
        },
        receptions: {
            type: DataTypes.INTEGER,
        },
        target_share: {
            type: DataTypes.FLOAT,
        },
        rec_yards: {
            type: DataTypes.FLOAT,
        },
        rec_yards_after_catch: {
            type: DataTypes.FLOAT,
        },
        rec_air_yards: {
            type: DataTypes.FLOAT,
        },
        rec_air_yards_share: {
            type: DataTypes.FLOAT,
        },
        rec_air_conversion_ratio: {
            type: DataTypes.FLOAT,
        },
        weighted_opportunity_rating: {
            type: DataTypes.FLOAT,
        },
        rec_epa: {
            type: DataTypes.FLOAT,
        },
        rec_tds: {
            type: DataTypes.INTEGER,
        },
        rec_two_pt_conversions: {
            type: DataTypes.INTEGER,
        },
        rec_first_downs: {
            type: DataTypes.INTEGER,
        },
        rec_fumbles: {
            type: DataTypes.INTEGER,
        },
        rec_fumbles_lost: {
            type: DataTypes.INTEGER,
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}