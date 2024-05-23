import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, WeeklyAdvPassModelLabel, WeeklyAdvPassTable } from '../../../../../constants/nfl/service.constants';
import { timestampColumn } from '../../../../../migrations/models/model.helpers';

export function weeklyAdvPassModelOptions(sequelize: Sequelize): any {
    return {
        modelName: WeeklyAdvPassModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: WeeklyAdvPassTable,
        timestamps: false,
    }
}

export function weeklyAdvPassSchema<T>(model: T): any {
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
        pass_drops: {
            type: DataTypes.INTEGER,
        },
        pass_drop_pct: {
            type: DataTypes.FLOAT,
        },
        rec_drop: {
            type: DataTypes.INTEGER,
        },
        rec_drop_pct: {
            type: DataTypes.FLOAT,
        },
        bad_throws: {
            type: DataTypes.INTEGER,
        },
        bad_throw_pct: {
            type: DataTypes.FLOAT,
        },
        blitzed: {
            type: DataTypes.INTEGER,
        },
        hurried: {
            type: DataTypes.INTEGER,
        },
        hit: {
            type: DataTypes.INTEGER,
        },
        pressured: {
            type: DataTypes.INTEGER,
        },
        pressured_pct: {
            type: DataTypes.FLOAT,
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}