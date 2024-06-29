import BioModel from '@player/models/bio.model';
import { bioModelOptions, bioSchema } from '@player/models/schema/bio.schema';
import { InitSeasonModels } from '@player/init-models/season.init';
import { InitWeeklyModels } from '@player/init-models/weekly.init';
import LeagueModel from '@player/models/league.model';
import { leagueModelOptions, leagueSchema } from '@player/models/schema/league.schema';
import { PlayerForeignKey, LeagueDraftTeamForeignKey, LeagueTeamForeignKey } from '@constants/nfl/service.constants';
import PlayerModel from '@player/models/player.model';
import { playerModelOptions, playerSchema } from '@player/models/schema/player.schema';
import { Sequelize } from 'sequelize';
import TeamModel from '@team/models/team.model';
import { teamModelOptions, teamSchema } from '@team/models/schema/team.schema';

export const InitTeamModel = (sequelize: Sequelize) => {
    TeamModel.init(teamSchema(), teamModelOptions(sequelize));
}

export const InitPlayerModels = (sequelize: Sequelize) => {
    InitTeamModel(sequelize);
    
    PlayerModel.init(playerSchema(), playerModelOptions(sequelize));
    BioModel.init(bioSchema(PlayerModel), bioModelOptions(sequelize));
    LeagueModel.init(leagueSchema(PlayerModel, TeamModel), leagueModelOptions(sequelize));    

    PlayerModel.hasOne(BioModel, PlayerForeignKey);
    PlayerModel.hasOne(LeagueModel, PlayerForeignKey);
    BioModel.belongsTo(PlayerModel, PlayerForeignKey);
    LeagueModel.belongsTo(PlayerModel, PlayerForeignKey);
    
    LeagueModel.belongsTo(TeamModel, LeagueDraftTeamForeignKey);
    LeagueModel.belongsTo(TeamModel, LeagueTeamForeignKey);

    InitSeasonModels(sequelize);
    InitWeeklyModels(sequelize);
}