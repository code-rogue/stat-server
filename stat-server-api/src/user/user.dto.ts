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
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
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
        },
        {
        sequelize,
        modelName: 'User',
        schema: 'auth',
        tableName: 'users',
        }
    );
};