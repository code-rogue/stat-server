import { Sequelize } from 'sequelize';

//const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/statServer');
export const sequelize = new Sequelize({
	dialect: 'postgres',
	host: 'localhost',
    username: 'postgres',
    password: 'password',
    database: 'statServer',
    port: 5432,
});