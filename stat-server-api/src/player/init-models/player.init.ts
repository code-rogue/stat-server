import { Sequelize } from 'sequelize';
import { playerModelOptions, playerSchema } from '@player/models/schema/player.schema';
import { PlayerForeignKey } from '@constants/nfl/service.constants';
import { BioModel, LeagueModel, PlayerModel } from '@player/models/player.model';
import { bioModelOptions, bioSchema } from '@player/models/schema/bio.schema';
import { leagueModelOptions, leagueSchema } from '@player/models/schema/league.schema';

import { InitSeasonModels } from '@player/init-models/season.init';
import { InitWeeklyModels } from '@player/init-models/weekly.init';

export const InitPlayerModels = (sequelize: Sequelize) => {
    PlayerModel.init(playerSchema(), playerModelOptions(sequelize));
    BioModel.init(bioSchema(PlayerModel), bioModelOptions(sequelize));
    LeagueModel.init(leagueSchema(PlayerModel), leagueModelOptions(sequelize));
    
    PlayerModel.hasOne(BioModel, PlayerForeignKey);
    PlayerModel.hasOne(LeagueModel, PlayerForeignKey);
    BioModel.belongsTo(PlayerModel, PlayerForeignKey);
    LeagueModel.belongsTo(PlayerModel, PlayerForeignKey);

    InitSeasonModels(sequelize);
    InitWeeklyModels(sequelize);
}