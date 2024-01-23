import { ConfigOptions } from './config/config.dto'
import { readFileSync } from 'fs';
import { Sequelize } from 'sequelize';

const config = JSON.parse(readFileSync('../config.json').toString()) as ConfigOptions
export const sequelize = new Sequelize({
	dialect: 'postgres',
	host: config.database.host,
	username: config.database.username,
	password: config.database.password,
	database: config.database.database,
	port: config.database.port,
});