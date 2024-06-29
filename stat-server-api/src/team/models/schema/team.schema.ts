import { DataTypes, Sequelize } from 'sequelize';
import { NFLSchema, TeamModelLabel, TeamTable } from '../../../constants/nfl/service.constants';
import { timestampColumn } from '../../../migrations/models/model.helpers';

export function teamModelOptions(sequelize: Sequelize): any {
    return {
        modelName: TeamModelLabel,
        schema: NFLSchema,
        sequelize: sequelize,
        tableName: TeamTable,
        timestamps: false,
    }
}

export function teamSchema(): any {
    return {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(8),
        },
        full_name: {
            type: DataTypes.STRING(128),
        },
        logo_url: {
            type: DataTypes.STRING(512),
        },
        created_date: timestampColumn(),
        last_modified: timestampColumn(),
    }
}