import BioModel from '@player/models/bio.model';
import { bioModelOptions, bioSchema } from '@player/models/schema/bio.schema';
import { InitSeasonModels } from '@player/init-models/season.init';
import { InitWeeklyModels } from '@player/init-models/weekly.init';
import LeagueModel from '@player/models/league.model';
import { leagueModelOptions, leagueSchema } from '@player/models/schema/league.schema';
import { PlayerForeignKey } from '@constants/nfl/service.constants';
import PlayerModel from '@player/models/player.model';
import { playerModelOptions, playerSchema } from '@player/models/schema/player.schema';
import { Sequelize } from 'sequelize';
import TeamModel from '@team/models/team.model';
import { teamModelOptions, teamSchema } from '@team/models/schema/team.schema';

export const InitPlayerModels = (sequelize: Sequelize) => {
    PlayerModel.init(playerSchema(), playerModelOptions(sequelize));
    BioModel.init(bioSchema(PlayerModel), bioModelOptions(sequelize));
    LeagueModel.init(leagueSchema(PlayerModel), leagueModelOptions(sequelize));    
    TeamModel.init(teamSchema(), teamModelOptions(sequelize));

    PlayerModel.hasOne(BioModel, PlayerForeignKey);
    PlayerModel.hasOne(LeagueModel, PlayerForeignKey);
    BioModel.belongsTo(PlayerModel, PlayerForeignKey);
    LeagueModel.belongsTo(PlayerModel, PlayerForeignKey);

    LeagueModel.hasOne(TeamModel, { sourceKey: 'team', foreignKey: { name: 'name' } });

    InitSeasonModels(sequelize);
    InitWeeklyModels(sequelize);
}