import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, PlayerModelLabel, PlayerTable } from '@constants/nfl/service.constants';
import { timestampColumn } from '@migrations/models/model.helpers';

export function playerModelOptions(sequelize: Sequelize): any {
    return {
        modelName: PlayerModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: PlayerTable,
        timestamps: false,
    }
}

export function playerSchema(): any {
    return {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        career_status: {
            type: DataTypes.STRING(128),
        },
        game_status_abbr: {
            type: DataTypes.STRING(128),
        },
        game_status: {
            type: DataTypes.STRING(128),
        },
        esb_id: {
            type: DataTypes.STRING(128),
        },
        gsis_id: {
            type: DataTypes.STRING(128),
        },
        gsis_it_id: {
            type: DataTypes.STRING(128),
        },
        smart_id: {
            type: DataTypes.STRING(128),
        },
        pfr_id: {
            type: DataTypes.STRING(128),
        },
        full_name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        short_name: {
            type: DataTypes.STRING(128),
        },
        suffix: {
            type: DataTypes.STRING(128),
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}

