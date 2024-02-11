import { Player, PlayerBio, PlayerLeagueData } from './models/nfl.player.model';
import { timestampInsertTrigger, timestampUpdateTrigger } from './models/model.helpers';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();
    await query.createSchema("nfl");
       
    await Player.sync();
    await PlayerBio.sync();
    await PlayerLeagueData.sync();

    await query.sequelize.query(timestampInsertTrigger('players_insert_trigger', 'nfl', 'players'));
    await query.sequelize.query(timestampInsertTrigger('playerBio_insert_trigger', 'nfl', 'player_bio'));
    await query.sequelize.query(timestampInsertTrigger('playLeague_insert_trigger', 'nfl', 'player_league'));

    await query.sequelize.query(timestampUpdateTrigger('players_update_trigger', 'nfl', 'players'));
    await query.sequelize.query(timestampUpdateTrigger('playerBio_update_trigger', 'nfl', 'player_bio'));
    await query.sequelize.query(timestampUpdateTrigger('playLeague_update_trigger', 'nfl', 'player_league'));
};

export const down: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();

    await PlayerBio.drop();
    await PlayerLeagueData.drop();
    await Player.drop();

    await query.dropSchema('nfl');
};