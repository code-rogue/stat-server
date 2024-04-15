import { Sequelize } from 'sequelize';
import { PlayerForeignKey, PlayerSeasonForeignKey } from '@constants/nfl/service.constants';
import { PlayerModel } from '@player/models/player.model';
import { seasonModelOptions, seasonSchema } from '@player/models/schema/season/season.schema';
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
    SeasonAdvDefStatModel,
    SeasonAdvPassStatModel,
    SeasonAdvRecStatModel,
    SeasonAdvRushStatModel, 
} from '@player/models/season/season.adv.model';
import { SeasonStatModel } from '@player/models/season/season.model';

export const InitSeasonModels = (sequelize: Sequelize) => {
    SeasonStatModel.init(seasonSchema(PlayerModel), seasonModelOptions(sequelize));
    SeasonAdvDefStatModel.init(seasonAdvDefSchema(SeasonStatModel), seasonAdvDefModelOptions(sequelize));
    SeasonAdvPassStatModel.init(seasonAdvPassSchema(SeasonStatModel), seasonAdvPassModelOptions(sequelize));
    SeasonAdvRecStatModel.init(seasonAdvRecSchema(SeasonStatModel), seasonAdvRecModelOptions(sequelize));
    SeasonAdvRushStatModel.init(seasonAdvRushSchema(SeasonStatModel), seasonAdvRushModelOptions(sequelize));

    PlayerModel.hasMany(SeasonStatModel, PlayerForeignKey);
    SeasonStatModel.belongsTo(PlayerModel, PlayerForeignKey);
    SeasonStatModel.hasOne(SeasonAdvDefStatModel, PlayerSeasonForeignKey);
    SeasonStatModel.hasOne(SeasonAdvPassStatModel, PlayerSeasonForeignKey);
    SeasonStatModel.hasOne(SeasonAdvRecStatModel, PlayerSeasonForeignKey);
    SeasonStatModel.hasOne(SeasonAdvRushStatModel, PlayerSeasonForeignKey);

    SeasonAdvDefStatModel.belongsTo(SeasonStatModel, PlayerSeasonForeignKey);
    SeasonAdvPassStatModel.belongsTo(SeasonStatModel, PlayerSeasonForeignKey);
    SeasonAdvRecStatModel.belongsTo(SeasonStatModel, PlayerSeasonForeignKey);
    SeasonAdvRushStatModel.belongsTo(SeasonStatModel, PlayerSeasonForeignKey);
}