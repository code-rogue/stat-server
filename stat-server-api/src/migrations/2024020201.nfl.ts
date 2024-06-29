import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();
    await query.createSchema("nfl");
};

export const down: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();
    await query.dropSchema('nfl');
};