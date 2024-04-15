import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, WeeklyAdvRushModelLabel, WeeklyAdvRushTable } from '@constants/nfl/service.constants';
import { timestampColumn } from '@migrations/models/model.helpers';

export function weeklyAdvRushModelOptions(sequelize: Sequelize): any {
    return {
        modelName: WeeklyAdvRushModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: WeeklyAdvRushTable,
        timestamps: false,
    }
}

export function weeklyAdvRushSchema<T>(model: T): any {
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
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}