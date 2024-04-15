import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, WeeklyAdvDefModelLabel, WeeklyAdvDefTable } from '@constants/nfl/service.constants';
import { timestampColumn } from '@migrations/models/model.helpers';

export function weeklyAdvDefModelOptions(sequelize: Sequelize): any {
    return {
        modelName: WeeklyAdvDefModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: WeeklyAdvDefTable,
        timestamps: false,
    }
}

export function weeklyAdvDefSchema<T>(model: T): any {
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
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}