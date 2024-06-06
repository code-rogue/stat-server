import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, SeasonRushModelLabel, SeasonRushTable } from '../../../../../constants/nfl/service.constants';
import { timestampColumn } from '../../../../../migrations/models/model.helpers';

export function seasonRushModelOptions(sequelize: Sequelize): any {
    return {
        modelName: SeasonRushModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: SeasonRushTable,
        timestamps: false,
    }
}

export function seasonRushSchema<T>(model: T): any {
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
        carries: {
            type: DataTypes.INTEGER,
        },
        rush_yards: {
            type: DataTypes.FLOAT,
        },
        rush_first_downs: {
          type: DataTypes.INTEGER,
        },
        rush_epa: {
          type: DataTypes.FLOAT,
        },
        rush_tds: {
            type: DataTypes.INTEGER,
        },
        rush_two_pt_conversions: {
          type: DataTypes.INTEGER,
        },
        rush_fumbles: {
            type: DataTypes.INTEGER,
        },
        rush_fumbles_lost: {
            type: DataTypes.INTEGER,
        },
        special_teams_tds: {
          type: DataTypes.INTEGER,
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}