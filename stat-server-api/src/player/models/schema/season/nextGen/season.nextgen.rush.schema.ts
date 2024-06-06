import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, SeasonNextGenRushModelLabel, SeasonNextGenRushTable } from '../../../../../constants/nfl/service.constants';
import { timestampColumn } from '../../../../../migrations/models/model.helpers';

export function seasonNextGenRushModelOptions(sequelize: Sequelize): any {
    return {
        modelName: SeasonNextGenRushModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: SeasonNextGenRushTable,
        timestamps: false,
    }
}

export function seasonNextGenRushSchema<T>(model: T): any {
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