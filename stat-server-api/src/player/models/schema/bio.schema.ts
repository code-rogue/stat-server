import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, BioModelLabel, BioTable } from '@constants/nfl/service.constants';
import { timestampColumn } from '@migrations/models/model.helpers';

export function bioModelOptions(sequelize: Sequelize): any {
    return {
        modelName: BioModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: BioTable,
        timestamps: false,
    }
}

export function bioSchema<T>(model: T): any {
    return {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        player_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model,
                key: 'id',
            },
        },
        birth_date: {
            type: DataTypes.DATEONLY,
        },
        college: {
            type: DataTypes.STRING(64),
        },
        college_conference: {
            type: DataTypes.STRING(64),
        },
        height: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        weight: {
            type: DataTypes.INTEGER,
        },
        headshot_url: {
            type: DataTypes.STRING(512),
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}

