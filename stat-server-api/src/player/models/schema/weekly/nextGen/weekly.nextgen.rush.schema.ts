import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, WeeklyNextGenRushModelLabel, WeeklyNextGenRushTable } from '@constants/nfl/service.constants';
import { timestampColumn } from '@migrations/models/model.helpers';

export function weeklyNextGenRushModelOptions(sequelize: Sequelize): any {
    return {
        modelName: WeeklyNextGenRushModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: WeeklyNextGenRushTable,
        timestamps: false,
    }
}

export function weeklyNextGenRushSchema<T>(model: T): any {
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
        efficiency: {
            type: DataTypes.FLOAT,
        },
        attempts_gte_eight_defenders_pct: {
            type: DataTypes.FLOAT,
        },
        avg_time_to_los: {
            type: DataTypes.FLOAT,
        },
        expected_yards: {
            type: DataTypes.FLOAT,
        },
        yards_over_expected: {
            type: DataTypes.FLOAT,
        },
        avg_yards: {
            type: DataTypes.FLOAT,
        },
        yards_over_expected_per_att: {
            type: DataTypes.FLOAT,
        },
        yards_over_expected_pct: {
            type: DataTypes.FLOAT,
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}