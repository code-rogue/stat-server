import { ApiProperty } from '@nestjs/swagger';
import { Sequelize, DataTypes, Model } from 'sequelize';

export class User extends Model {
    @ApiProperty()    
    id: number;
    @ApiProperty()    
    userName: string;
    @ApiProperty()
    hashedPassword: string;
    @ApiProperty()
    created_date: Date;
    @ApiProperty()
    last_modified: Date;
}

export const InitUserModel = (sequelize: Sequelize) => {
    User.init(
        {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hashedPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_date: {
            type: DataTypes.DATE,
        },
        last_modified: {
            type: DataTypes.DATE,
        }
        },
        {
            sequelize,
            modelName: 'User',
            schema: 'auth',
            tableName: 'users',
            timestamps: false,
        }
    );
};