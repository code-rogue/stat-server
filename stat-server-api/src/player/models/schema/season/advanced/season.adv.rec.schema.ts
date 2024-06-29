import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, SeasonAdvRecModelLabel, SeasonAdvRecTable } from '../../../../../constants/nfl/service.constants';
import { timestampColumn } from '../../../../../migrations/models/model.helpers';

export function seasonAdvRecModelOptions(sequelize: Sequelize): any {
    return {
        modelName: SeasonAdvRecModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: SeasonAdvRecTable,
        timestamps: false,
    }
}

export function seasonAdvRecSchema<T>(model: T): any {
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
        targets: {
            type: DataTypes.INTEGER,
        },
        receptions: {
            type: DataTypes.INTEGER,
        },
        yards: {
            type: DataTypes.FLOAT,
        },
        tds: {
            type: DataTypes.FLOAT,
        },
        longest_rec: {
            type: DataTypes.FLOAT,
        },
        air_yards: {
            type: DataTypes.FLOAT,
        },
        air_yards_avg: {
            type: DataTypes.FLOAT,
        },
        yards_after_contact: {
            type: DataTypes.FLOAT,
        },
        yards_after_contact_avg: {
            type: DataTypes.FLOAT,
        },
        adot: {
            type: DataTypes.FLOAT,
        },
        broken_tackles: {
            type: DataTypes.INTEGER,
        },
        broken_tackles_avg: {
            type: DataTypes.FLOAT,
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

