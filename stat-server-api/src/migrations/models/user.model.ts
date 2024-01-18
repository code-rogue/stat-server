import { DataTypes } from 'sequelize';
import { sequelize } from '../../database';

export const User = sequelize.define(
  'User',
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    hashedPassword: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
  },
  {
    schema: 'auth',
    tableName: 'users',
  }
);