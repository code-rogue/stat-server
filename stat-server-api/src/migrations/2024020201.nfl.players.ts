import {
    BioTable,
    LeagueTable,
    NFLSchema,
    PlayerTable
} from '../constants/nfl/service.constants';
import { Player, PlayerBio, PlayerLeagueData } from './models/nfl.player.model';
import { timestampInsertTrigger, timestampUpdateTrigger } from './models/model.helpers';

import type { Migration } from '../umzug';

export const up: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();
    await query.createSchema("nfl");
       
    await Player.sync();
    await PlayerBio.sync();
    await PlayerLeagueData.sync();

    await query.sequelize.query(timestampInsertTrigger(NFLSchema, PlayerTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, BioTable));
    await query.sequelize.query(timestampInsertTrigger(NFLSchema, LeagueTable));

    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, PlayerTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, BioTable));
    await query.sequelize.query(timestampUpdateTrigger(NFLSchema, LeagueTable));
};

export const down: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();

    await PlayerBio.drop();
    await PlayerLeagueData.drop();
    await Player.drop();

    await query.dropSchema('nfl');
};