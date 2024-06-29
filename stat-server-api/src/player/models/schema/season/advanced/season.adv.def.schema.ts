import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, SeasonAdvDefModelLabel, SeasonAdvDefTable } from '../../../../../constants/nfl/service.constants';
import { timestampColumn } from '../../../../../migrations/models/model.helpers';

export function seasonAdvDefModelOptions(sequelize: Sequelize): any {
    return {
        modelName: SeasonAdvDefModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: SeasonAdvDefTable,
        timestamps: false,
    }
}

export function seasonAdvDefSchema<T>(model: T): any {
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
        tds_allowed: {
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
        qbkd: {
            type: DataTypes.FLOAT,
        },
        sacks: {
            type: DataTypes.FLOAT,
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

