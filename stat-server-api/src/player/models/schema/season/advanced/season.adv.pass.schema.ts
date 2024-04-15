import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, SeasonAdvPassModelLabel, SeasonAdvPassTable } from '@constants/nfl/service.constants';
import { timestampColumn } from '@migrations/models/model.helpers';

export function seasonAdvPassModelOptions(sequelize: Sequelize): any {
    return {
        modelName: SeasonAdvPassModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: SeasonAdvPassTable,
        timestamps: false,
    }
}

export function seasonAdvPassSchema<T>(model: T): any {
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
        attempts: {
            type: DataTypes.INTEGER,
        },
        throw_aways: {
            type: DataTypes.INTEGER,
        },
        spikes: {
            type: DataTypes.INTEGER,
        },
        drops: {
            type: DataTypes.INTEGER,
        },
        drop_pct: {
            type: DataTypes.FLOAT,
        },
        bad_throws: {
            type: DataTypes.INTEGER,
        },
        bad_throw_pct: {
            type: DataTypes.FLOAT,
        },
        pocket_time: {
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
        batted_balls: {
            type: DataTypes.INTEGER,
        },
        on_tgt_throws: {
            type: DataTypes.INTEGER,
        },
        on_tgt_throws_pct: {
            type: DataTypes.FLOAT,
        },
        rpo_plays: {
            type: DataTypes.INTEGER,
        },
        rpo_yards: {
            type: DataTypes.FLOAT,
        },
        rpo_pass_attempts: {
            type: DataTypes.FLOAT,
        },
        rpo_pass_yards: {
            type: DataTypes.FLOAT,
        },
        rpo_rush_attempts: {
            type: DataTypes.FLOAT,
        },
        rpo_rush_yards: {
            type: DataTypes.FLOAT,
        },
        pa_pass_attempts: {
            type: DataTypes.FLOAT,
        },
        pa_pass_yards: {
            type: DataTypes.FLOAT,
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}

