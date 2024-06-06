import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, SeasonNextGenRecModelLabel, SeasonNextGenRecTable } from '../../../../../constants/nfl/service.constants';
import { timestampColumn } from '../../../../../migrations/models/model.helpers';

export function seasonNextGenRecModelOptions(sequelize: Sequelize): any {
    return {
        modelName: SeasonNextGenRecModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: SeasonNextGenRecTable,
        timestamps: false,
    }
}

export function seasonNextGenRecSchema<T>(model: T): any {
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
        avg_cushion: {
            type: DataTypes.FLOAT,
        },
        avg_separation: {
            type: DataTypes.FLOAT,
        },
        avg_intended_air_yards: {
            type: DataTypes.FLOAT,
        },
        catch_pct: {
          type: DataTypes.FLOAT,
        },
        share_of_intended_air_yards_pct: {
            type: DataTypes.FLOAT,
        },
        avg_yac: {
            type: DataTypes.FLOAT,
        },
        avg_expected_yac: {
            type: DataTypes.FLOAT,
        },
        avg_yac_above_expectation: {
            type: DataTypes.FLOAT,
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}