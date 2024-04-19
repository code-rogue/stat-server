import { PlayerForeignKey, PlayerWeeklyForeignKey } from '@constants/nfl/service.constants';
import PlayerModel from '@player/models/player.model';
import { Sequelize } from 'sequelize';
import { weeklyAdvDefModelOptions, weeklyAdvDefSchema } from '@player/models/schema/weekly/advanced/weekly.adv.def.schema';
import WeeklyAdvDefStatModel from '@player/models/weekly/advanced/weekly.adv.def.model';
import { weeklyAdvPassModelOptions, weeklyAdvPassSchema } from '@player/models/schema/weekly/advanced/weekly.adv.pass.schema';
import WeeklyAdvPassStatModel from '@player/models/weekly/advanced/weekly.adv.pass.model';
import { weeklyAdvRecModelOptions, weeklyAdvRecSchema } from '@player/models/schema/weekly/advanced/weekly.adv.rec.schema';
import WeeklyAdvRecStatModel from '@player/models/weekly/advanced/weekly.adv.rec.model';
import { weeklyAdvRushModelOptions, weeklyAdvRushSchema } from '@player/models/schema/weekly/advanced/weekly.adv.rush.schema';
import WeeklyAdvRushStatModel from '@player/models/weekly/advanced/weekly.adv.rush.model';
import { weeklyDefModelOptions, weeklyDefSchema } from '@player/models/schema/weekly/weekly.def.schema';
import WeeklyDefStatModel  from '@player/models/weekly/weekly.def.model';
import { weeklyKickModelOptions, weeklyKickSchema } from '@player/models/schema/weekly/weekly.kick.schema';
import WeeklyKickStatModel  from '@player/models/weekly/weekly.kick.model';
import { weeklyModelOptions, weeklySchema } from '@player/models/schema/weekly/weekly.schema';
import { 
    weeklyNextGenPassModelOptions, 
    weeklyNextGenPassSchema 
} from '@player/models/schema/weekly/nextGen/weekly.nextgen.pass.schema';
import WeeklyNextGenPassStatModel from '@player/models/weekly/nextGen/weekly.nextgen.pass.model';
import { 
    weeklyNextGenRecModelOptions, 
    weeklyNextGenRecSchema 
} from '@player/models/schema/weekly/nextGen/weekly.nextgen.rec.schema';
import WeeklyNextGenRecStatModel from '@player/models/weekly/nextGen/weekly.nextgen.rec.model';
import { 
    weeklyNextGenRushModelOptions, 
    weeklyNextGenRushSchema 
} from '@player/models/schema/weekly/nextGen/weekly.nextgen.rush.schema';
import WeeklyNextGenRushStatModel from '@player/models/weekly/nextGen/weekly.nextgen.rush.model';
import { weeklyPassModelOptions, weeklyPassSchema } from '@player/models/schema/weekly/weekly.pass.schema';
import WeeklyPassStatModel from '@player/models/weekly/weekly.pass.model';
import { weeklyRecModelOptions, weeklyRecSchema } from '@player/models/schema/weekly/weekly.rec.schema';
import WeeklyRecStatModel from '@player/models/weekly/weekly.rec.model';
import { weeklyRushModelOptions, weeklyRushSchema } from '@player/models/schema/weekly/weekly.rush.schema';
import WeeklyRushStatModel from '@player/models/weekly/weekly.rush.model';
import WeeklyStatModel from '@player/models/weekly/weekly.model';

export const InitWeeklyModels = (sequelize: Sequelize) => {
    WeeklyStatModel.init(weeklySchema(PlayerModel), weeklyModelOptions(sequelize));
    WeeklyDefStatModel.init(weeklyDefSchema(WeeklyStatModel), weeklyDefModelOptions(sequelize));
    WeeklyKickStatModel.init(weeklyKickSchema(WeeklyStatModel), weeklyKickModelOptions(sequelize));
    WeeklyPassStatModel.init(weeklyPassSchema(WeeklyStatModel), weeklyPassModelOptions(sequelize));
    WeeklyRecStatModel.init(weeklyRecSchema(WeeklyStatModel), weeklyRecModelOptions(sequelize));
    WeeklyRushStatModel.init(weeklyRushSchema(WeeklyStatModel), weeklyRushModelOptions(sequelize));

    WeeklyNextGenPassStatModel.init(weeklyNextGenPassSchema(WeeklyStatModel), weeklyNextGenPassModelOptions(sequelize));
    WeeklyNextGenRecStatModel.init(weeklyNextGenRecSchema(WeeklyStatModel), weeklyNextGenRecModelOptions(sequelize));
    WeeklyNextGenRushStatModel.init(weeklyNextGenRushSchema(WeeklyStatModel), weeklyNextGenRushModelOptions(sequelize));

    WeeklyAdvDefStatModel.init(weeklyAdvDefSchema(WeeklyStatModel), weeklyAdvDefModelOptions(sequelize));
    WeeklyAdvPassStatModel.init(weeklyAdvPassSchema(WeeklyStatModel), weeklyAdvPassModelOptions(sequelize));
    WeeklyAdvRecStatModel.init(weeklyAdvRecSchema(WeeklyStatModel), weeklyAdvRecModelOptions(sequelize));
    WeeklyAdvRushStatModel.init(weeklyAdvRushSchema(WeeklyStatModel), weeklyAdvRushModelOptions(sequelize));

    WeeklyStatModel.belongsTo(PlayerModel, PlayerForeignKey);
    WeeklyStatModel.hasOne(WeeklyDefStatModel, PlayerWeeklyForeignKey);
    WeeklyStatModel.hasOne(WeeklyKickStatModel, PlayerWeeklyForeignKey);
    WeeklyStatModel.hasOne(WeeklyPassStatModel, PlayerWeeklyForeignKey);
    WeeklyStatModel.hasOne(WeeklyRecStatModel, PlayerWeeklyForeignKey);
    WeeklyStatModel.hasOne(WeeklyRushStatModel, PlayerWeeklyForeignKey);
    
    WeeklyStatModel.hasOne(WeeklyAdvDefStatModel, PlayerWeeklyForeignKey);
    WeeklyStatModel.hasOne(WeeklyAdvPassStatModel, PlayerWeeklyForeignKey);
    WeeklyStatModel.hasOne(WeeklyAdvRecStatModel, PlayerWeeklyForeignKey);
    WeeklyStatModel.hasOne(WeeklyAdvRushStatModel, PlayerWeeklyForeignKey);

    WeeklyStatModel.hasOne(WeeklyNextGenPassStatModel, PlayerWeeklyForeignKey);
    WeeklyStatModel.hasOne(WeeklyNextGenRecStatModel, PlayerWeeklyForeignKey);
    WeeklyStatModel.hasOne(WeeklyNextGenRushStatModel, PlayerWeeklyForeignKey);
    
    WeeklyDefStatModel.belongsTo(WeeklyStatModel, PlayerWeeklyForeignKey);
    WeeklyKickStatModel.belongsTo(WeeklyStatModel, PlayerWeeklyForeignKey);
    WeeklyPassStatModel.belongsTo(WeeklyStatModel, PlayerWeeklyForeignKey);
    WeeklyRecStatModel.belongsTo(WeeklyStatModel, PlayerWeeklyForeignKey);
    WeeklyRushStatModel.belongsTo(WeeklyStatModel, PlayerWeeklyForeignKey);
    
    WeeklyAdvDefStatModel.belongsTo(WeeklyStatModel, PlayerWeeklyForeignKey);
    WeeklyAdvPassStatModel.belongsTo(WeeklyStatModel, PlayerWeeklyForeignKey);
    WeeklyAdvRecStatModel.belongsTo(WeeklyStatModel, PlayerWeeklyForeignKey);
    WeeklyAdvRushStatModel.belongsTo(WeeklyStatModel, PlayerWeeklyForeignKey);

    WeeklyNextGenPassStatModel.belongsTo(WeeklyStatModel, PlayerWeeklyForeignKey);
    WeeklyNextGenRecStatModel.belongsTo(WeeklyStatModel, PlayerWeeklyForeignKey);
    WeeklyNextGenRushStatModel.belongsTo(WeeklyStatModel, PlayerWeeklyForeignKey);
}