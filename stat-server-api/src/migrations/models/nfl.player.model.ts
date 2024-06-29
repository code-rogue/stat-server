import { sequelize } from '../../sequelize';

import {
    BioModelLabel,
    PlayerModelLabel,
    LeagueModelLabel,
} from '../../constants/nfl/service.constants';

import { playerModelOptions, playerSchema } from '../../player/models/schema/player.schema';
import { bioModelOptions, bioSchema } from '../../player/models/schema/bio.schema';
import { leagueModelOptions, leagueSchema } from '../../player/models/schema/league.schema';
import { Team } from './nfl.team.model';

export const Player = sequelize.define(
    PlayerModelLabel,
    playerSchema(),
    playerModelOptions(sequelize),
);

export const PlayerBio = sequelize.define(
    BioModelLabel,
    bioSchema(Player),
    bioModelOptions(sequelize),
  );

  export const PlayerLeagueData = sequelize.define(
    LeagueModelLabel,
    leagueSchema(Player, Team),
    leagueModelOptions(sequelize),    
  );