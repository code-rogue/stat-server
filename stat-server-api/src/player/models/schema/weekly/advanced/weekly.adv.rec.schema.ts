import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, WeeklyAdvRecModelLabel, WeeklyAdvRecTable } from '@constants/nfl/service.constants';
import { timestampColumn } from '@migrations/models/model.helpers';

export function weeklyAdvRecModelOptions(sequelize: Sequelize): any {
    return {
        modelName: WeeklyAdvRecModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: WeeklyAdvRecTable,
        timestamps: false,
    }
}

export function weeklyAdvRecSchema<T>(model: T): any {
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
        broken_tackles: {
            type: DataTypes.INTEGER,
        },
        drops: {
            type: DataTypes.INTEGER,
        },
        drop_pct: {
            type: DataTypes.FLOAT,
        },
        interceptions: {
            type: DataTypes.INTEGER,
        },
        qb_rating: {
            type: DataTypes.FLOAT,
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}