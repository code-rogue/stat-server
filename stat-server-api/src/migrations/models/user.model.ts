import { DataTypes } from 'sequelize';
import { sequelize } from '../../sequelize';
import { timestampColumn } from './model.helpers';

export const User = sequelize.define(
  'User',
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    hashedPassword: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    created_date: timestampColumn(sequelize),
    last_modified: timestampColumn(sequelize),
  },
  {
    schema: 'auth',
    tableName: 'users',
    timestamps: false,
  }
);