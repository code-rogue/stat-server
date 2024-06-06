import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, SeasonDefModelLabel, SeasonDefTable } from '../../../../../constants/nfl/service.constants';
import { timestampColumn } from '../../../../../migrations/models/model.helpers';

export function seasonDefModelOptions(sequelize: Sequelize): any {
    return {
        modelName: SeasonDefModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: SeasonDefTable,
        timestamps: false,
    }
}

export function seasonDefSchema<T>(model: T): any {
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
        tackles: {
            type: DataTypes.FLOAT,
        },
        tackles_solo: {
            type: DataTypes.FLOAT,
        },
        tackle_with_assists: {
            type: DataTypes.FLOAT,
        },
        tackle_assists: {
            type: DataTypes.FLOAT,
        },
        tackles_for_loss: {
            type: DataTypes.FLOAT,
        },
        tackles_for_loss_yards: {
            type: DataTypes.FLOAT,
        },
        fumbles_forced: {
            type: DataTypes.FLOAT,
        },
        sacks: {
            type: DataTypes.FLOAT,
        },
        sack_yards: {
            type: DataTypes.FLOAT,
        },
        qb_hits: {
            type: DataTypes.FLOAT,
        },
        interceptions: {
            type: DataTypes.FLOAT,
        },
        interception_yards: {
            type: DataTypes.FLOAT,
        },
        pass_defended: {
            type: DataTypes.FLOAT,
        },
        tds: {
            type: DataTypes.FLOAT,
        },
        fumbles: {
            type: DataTypes.FLOAT,
        },
        fumble_recovery_own: {
            type: DataTypes.FLOAT,
        },
        fumble_recovery_yards_own: {
            type: DataTypes.FLOAT,
        },
        fumble_recovery_opp: {
            type: DataTypes.FLOAT,
        },
        fumble_recovery_yards_opp: {
            type: DataTypes.FLOAT,
        },
        safety: {
            type: DataTypes.FLOAT,
        },
        penalty: {
            type: DataTypes.FLOAT,
        },
        penalty_yards: {
            type: DataTypes.FLOAT,
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}