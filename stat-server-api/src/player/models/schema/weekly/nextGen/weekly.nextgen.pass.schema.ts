import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, WeeklyNextGenPassModelLabel, WeeklyNextGenPassTable } from '../../../../../constants/nfl/service.constants';
import { timestampColumn } from '../../../../../migrations/models/model.helpers';

export function weeklyNextGenPassModelOptions(sequelize: Sequelize): any {
    return {
        modelName: WeeklyNextGenPassModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: WeeklyNextGenPassTable,
        timestamps: false,
    }
}

export function weeklyNextGenPassSchema<T>(model: T): any {
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
        aggressiveness: {
            type: DataTypes.FLOAT,
        },
        avg_time_to_throw: {
            type: DataTypes.FLOAT,
        },
        avg_air_distance: {
            type: DataTypes.FLOAT,
        },
        max_air_distance: {
            type: DataTypes.FLOAT,
        },
        avg_completed_air_yards: {
            type: DataTypes.FLOAT,
        },
        avg_intended_air_yards: {
            type: DataTypes.FLOAT,
        },
        avg_air_yards_differential: {
            type: DataTypes.FLOAT,
        },
        avg_air_yards_to_sticks: {
            type: DataTypes.FLOAT,
        },
        max_completed_air_distance: {
            type: DataTypes.FLOAT,
        },
        passer_rating: {
            type: DataTypes.FLOAT,
        },
        completion_pct: {
            type: DataTypes.FLOAT,
        },
        expected_completion_pct: {
            type: DataTypes.FLOAT,
        },
        completions_above_expectation_pct: {
            type: DataTypes.FLOAT,
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}