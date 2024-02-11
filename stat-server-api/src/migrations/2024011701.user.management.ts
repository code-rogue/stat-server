import { Password } from '../auth/auth.password'
import { timestampInsertTrigger, timestampUpdateTrigger } from './models/model.helpers';
import { User } from './models/user.model';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
	const password = new Password();
    const query = sequelize.getQueryInterface();
    
    await query.createSchema("auth")
    await query.createFunction('insert_trigger_function', [], 'TRIGGER', 'plpgsql', `
        BEGIN
            NEW.created_date = NOW();
            NEW.last_modified = NOW();
            RETURN NEW;
        END;`);

    await query.createFunction('update_trigger_function', [], 'TRIGGER', 'plpgsql', `
        BEGIN
            IF NEW.* IS DISTINCT FROM OLD.* THEN
                NEW.last_modified = NOW();
            END IF;
            RETURN NEW;
        END;`);

    await User.sync();
    await query.sequelize.query(timestampInsertTrigger('users_insert_trigger', 'auth', 'users'));
    await query.sequelize.query(timestampUpdateTrigger('users_update_trigger', 'auth', 'users'));

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
    //await query.dropTrigger('auth.users', 'users_insert_trigger');
    //await query.dropTrigger('auth.users', 'users_update_trigger');

    await User.drop()

    await query.dropFunction('insert_trigger_function', []);
    await query.dropFunction('update_trigger_function', []);
    await query.dropSchema('auth');
};