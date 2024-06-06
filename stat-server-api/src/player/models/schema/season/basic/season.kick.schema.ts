import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, SeasonKickModelLabel, SeasonKickTable } from '../../../../../constants/nfl/service.constants';
import { timestampColumn } from '../../../../../migrations/models/model.helpers';

export function seasonKickModelOptions(sequelize: Sequelize): any {
    return {
        modelName: SeasonKickModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: SeasonKickTable,
        timestamps: false,
    }
}

export function seasonKickSchema<T>(model: T): any {
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
        fg_att: {
            type: DataTypes.INTEGER,
        },
        fg_made: {
            type: DataTypes.INTEGER,
        },
        fg_missed: {
            type: DataTypes.INTEGER,
        },
        fg_blocked: {
            type: DataTypes.INTEGER,
        },
        fg_pct: {
            type: DataTypes.FLOAT,
        },
        fg_long: {
            type: DataTypes.FLOAT,
        },
        fg_made_0_19: {
            type: DataTypes.INTEGER,
        },
        fg_made_20_29: {
            type: DataTypes.INTEGER,
        },
        fg_made_30_39: {
            type: DataTypes.INTEGER,
        },
        fg_made_40_49: {
            type: DataTypes.INTEGER,
        },
        fg_made_50_59: {
            type: DataTypes.INTEGER,
        },
        fg_made_60_: {
            type: DataTypes.INTEGER,
        },
        fg_missed_0_19: {
            type: DataTypes.INTEGER,
        },
        fg_missed_20_29: {
            type: DataTypes.INTEGER,
        },
        fg_missed_30_39: {
            type: DataTypes.INTEGER,
        },
        fg_missed_40_49: {
            type: DataTypes.INTEGER,
        },
        fg_missed_50_59: {
            type: DataTypes.INTEGER,
        },
        fg_missed_60_: {
            type: DataTypes.INTEGER,
        },
        fg_made_distance: {
            type: DataTypes.FLOAT,
        },
        fg_missed_distance: {
            type: DataTypes.FLOAT,
        },
        fg_blocked_distance: {
            type: DataTypes.FLOAT,
        },
        gwfg_att: {
            type: DataTypes.INTEGER,
        },
        gwfg_distance: {
            type: DataTypes.FLOAT,
        },
        gwfg_made: {
            type: DataTypes.INTEGER,
        },
        gwfg_missed: {
            type: DataTypes.INTEGER,
        },
        gwfg_blocked: {
            type: DataTypes.INTEGER,
        },
        pat_att: {
            type: DataTypes.INTEGER,
        },
        pat_made: {
            type: DataTypes.INTEGER,
        },
        pat_missed: {
            type: DataTypes.INTEGER,
        },
        pat_blocked: {
            type: DataTypes.INTEGER,
        },
        pat_pct: {
            type: DataTypes.FLOAT,
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}