import { Sequelize } from 'sequelize';
import { 
    PlayerForeignKey, 
    PlayerSeasonForeignKey, 
    PlayerSeasonStatForeignKey 
} from '@constants/nfl/service.constants';
import PlayerModel from '@player/models/player.model';
import { 
    seasonAdvDefModelOptions, 
    seasonAdvDefSchema 
} from '@player/models/schema/season/advanced/season.adv.def.schema';
import { 
    seasonAdvPassModelOptions, 
    seasonAdvPassSchema 
} from '@player/models/schema/season/advanced/season.adv.pass.schema';
import { 
    seasonAdvRecModelOptions, 
    seasonAdvRecSchema 
} from '@player/models/schema/season/advanced/season.adv.rec.schema';
import { 
    seasonAdvRushModelOptions,
    seasonAdvRushSchema 
} from '@player/models/schema/season/advanced/season.adv.rush.schema';
import { 
    seasonDefModelOptions, 
    seasonDefSchema 
} from '@player/models/schema/season/season.def.schema';
import { 
    seasonKickModelOptions, 
    seasonKickSchema 
} from '@player/models/schema/season/season.kick.schema';
import { 
    seasonPassModelOptions, 
    seasonPassSchema 
} from '@player/models/schema/season/season.pass.schema';
import { 
    seasonRecModelOptions, 
    seasonRecSchema 
} from '@player/models/schema/season/season.rec.schema';
import { 
    seasonRushModelOptions, 
    seasonRushSchema 
} from '@player/models/schema/season/season.rush.schema';

import SeasonAdvDefStatModel from '@player/models/season/advanced/season.adv.def.model';
import SeasonAdvPassStatModel from '@player/models/season/advanced/season.adv.pass.model';
import SeasonAdvRecStatModel from '@player/models/season/advanced/season.adv.rec.model';
import SeasonAdvRushStatModel from '@player/models/season/advanced/season.adv.rush.model';
import SeasonDefStatModel from '@player/models/season/season.def.model';
import SeasonKickStatModel from '@player/models/season/season.kick.model';
import SeasonPassStatModel from '@player/models/season/season.pass.model';
import SeasonRecStatModel from '@player/models/season/season.rec.model';
import SeasonRushStatModel from '@player/models/season/season.rush.model';
import { seasonModelOptions, seasonSchema } from '@player/models/schema/season/season.schema';
import SeasonStatModel from '@player/models/season/season.model';

export const InitSeasonModels = (sequelize: Sequelize) => {
    SeasonStatModel.init(seasonSchema(PlayerModel), seasonModelOptions(sequelize));
    SeasonAdvDefStatModel.init(seasonAdvDefSchema(SeasonStatModel), seasonAdvDefModelOptions(sequelize));
    SeasonAdvPassStatModel.init(seasonAdvPassSchema(SeasonStatModel), seasonAdvPassModelOptions(sequelize));
    SeasonAdvRecStatModel.init(seasonAdvRecSchema(SeasonStatModel), seasonAdvRecModelOptions(sequelize));
    SeasonAdvRushStatModel.init(seasonAdvRushSchema(SeasonStatModel), seasonAdvRushModelOptions(sequelize));

    SeasonDefStatModel.init(seasonDefSchema(PlayerModel), seasonDefModelOptions(sequelize));
    SeasonKickStatModel.init(seasonKickSchema(PlayerModel), seasonKickModelOptions(sequelize));
    SeasonPassStatModel.init(seasonPassSchema(PlayerModel), seasonPassModelOptions(sequelize));
    SeasonRecStatModel.init(seasonRecSchema(PlayerModel), seasonRecModelOptions(sequelize));
    SeasonRushStatModel.init(seasonRushSchema(PlayerModel), seasonRushModelOptions(sequelize));

    PlayerModel.hasMany(SeasonStatModel, PlayerForeignKey);
    SeasonStatModel.belongsTo(PlayerModel, PlayerForeignKey);
    SeasonStatModel.hasOne(SeasonAdvDefStatModel, PlayerSeasonForeignKey);
    SeasonStatModel.hasOne(SeasonAdvPassStatModel, PlayerSeasonForeignKey);
    SeasonStatModel.hasOne(SeasonAdvRecStatModel, PlayerSeasonForeignKey);
    SeasonStatModel.hasOne(SeasonAdvRushStatModel, PlayerSeasonForeignKey);

    SeasonStatModel.hasOne(SeasonDefStatModel, PlayerSeasonStatForeignKey);
    SeasonStatModel.hasOne(SeasonKickStatModel, PlayerSeasonStatForeignKey);
    SeasonStatModel.hasOne(SeasonPassStatModel, PlayerSeasonStatForeignKey);
    SeasonStatModel.hasOne(SeasonRecStatModel, PlayerSeasonStatForeignKey);
    SeasonStatModel.hasOne(SeasonRushStatModel, PlayerSeasonStatForeignKey);
    
    SeasonAdvDefStatModel.belongsTo(SeasonStatModel, PlayerSeasonForeignKey);
    SeasonAdvPassStatModel.belongsTo(SeasonStatModel, PlayerSeasonForeignKey);
    SeasonAdvRecStatModel.belongsTo(SeasonStatModel, PlayerSeasonForeignKey);
    SeasonAdvRushStatModel.belongsTo(SeasonStatModel, PlayerSeasonForeignKey);
}