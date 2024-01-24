import { Password } from '../auth/auth.password'
import { User } from './models/user.model';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
	const password = new Password();
    const query = sequelize.getQueryInterface();
    
    await query.createSchema("auth")
    await User.sync();

    try {
        const hashedPassword = await password.hashPassword('admin');
        const defaultUser = await User.create({
            userName: 'admin',
            hashedPassword,
        });

        console.log('User created:', defaultUser.toJSON());
    } catch (error) {
        console.error('Error creating default user:', error);
    }
};

export const down: Migration = async ({ context: sequelize }) => {
	const query = sequelize.getQueryInterface();
    
    await User.drop()
    await query.dropSchema('auth');
};