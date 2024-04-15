import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, WeeklyPassModelLabel, WeeklyPassTable } from '@constants/nfl/service.constants';
import { timestampColumn } from '@migrations/models/model.helpers';

export function weeklyPassModelOptions(sequelize: Sequelize): any {
    return {
        modelName: WeeklyPassModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: WeeklyPassTable,
        timestamps: false,
    }
}

export function weeklyPassSchema<T>(model: T): any {
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
        attempts: {
            type: DataTypes.INTEGER,
        },
        completions: {
            type: DataTypes.INTEGER,
        },
        pass_yards: {
            type: DataTypes.FLOAT,
        },
        pass_yards_after_catch: {
            type: DataTypes.FLOAT,
        },
        pass_air_yards: {
            type: DataTypes.FLOAT,
        },
        pass_air_conversion_ratio: {
            type: DataTypes.FLOAT,
        },
        pass_first_downs: {
            type: DataTypes.INTEGER,
        },
        dakota: {
            type: DataTypes.FLOAT,
        },
        pass_epa: {
            type: DataTypes.FLOAT,
        },
        pass_tds: {
            type: DataTypes.INTEGER,
        },
        pass_two_pt_conversions: {
            type: DataTypes.INTEGER,
        },
        interceptions: {
            type: DataTypes.INTEGER,
        },
        sacks: {
            type: DataTypes.FLOAT,
        },
        sack_yards: {
            type: DataTypes.FLOAT,
        },
        sack_fumbles: {
            type: DataTypes.INTEGER,
        },
        sack_fumbles_lost: {
            type: DataTypes.INTEGER,
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}