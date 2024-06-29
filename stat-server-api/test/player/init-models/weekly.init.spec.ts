import * as advDefSchema from '@player/models/schema/weekly/advanced/weekly.adv.def.schema';
import * as advPassSchema from '@player/models/schema/weekly/advanced/weekly.adv.pass.schema';
import * as advRecSchema from '@player/models/schema/weekly/advanced/weekly.adv.rec.schema';
import * as advRushSchema from '@player/models/schema/weekly/advanced/weekly.adv.rush.schema';
import * as defSchema from '@player/models/schema/weekly/weekly.def.schema';
import * as kickSchema from '@player/models/schema/weekly/weekly.kick.schema';
import * as iw from '@player/init-models/weekly.init';
import * as nextGenPassSchema from '@player/models/schema/weekly/nextGen/weekly.nextgen.pass.schema';
import * as nextGenRecSchema from '@player/models/schema/weekly/nextGen/weekly.nextgen.rec.schema';
import * as nextGenRushSchema from '@player/models/schema/weekly/nextGen/weekly.nextgen.rush.schema';
import * as passSchema from '@player/models/schema/weekly/weekly.pass.schema';
import * as recSchema from '@player/models/schema/weekly/weekly.rec.schema';
import * as rushSchema from '@player/models/schema/weekly/weekly.rush.schema';
import * as weeklySchema from '@player/models/schema/weekly/weekly.schema';

import PlayerModel from '@player/models/player.model';
import TeamModel from '@team/models/team.model';
import WeeklyAdvDefStatModel from '@player/models/weekly/advanced/weekly.adv.def.model';
import WeeklyAdvPassStatModel from '@player/models/weekly/advanced/weekly.adv.pass.model';
import WeeklyAdvRecStatModel from '@player/models/weekly/advanced/weekly.adv.rec.model';
import WeeklyAdvRushStatModel from '@player/models/weekly/advanced/weekly.adv.rush.model';
import WeeklyDefStatModel from '@player/models/weekly/weekly.def.model';
import WeeklyKickStatModel from '@player/models/weekly/weekly.kick.model';
import WeeklyNextGenPassStatModel from '@player/models/weekly/nextGen/weekly.nextgen.pass.model';
import WeeklyNextGenRecStatModel from '@player/models/weekly/nextGen/weekly.nextgen.rec.model';
import WeeklyNextGenRushStatModel from '@player/models/weekly/nextGen/weekly.nextgen.rush.model';
import WeeklyPassStatModel from '@player/models/weekly/weekly.pass.model';
import WeeklyRecStatModel from '@player/models/weekly/weekly.rec.model';
import WeeklyRushStatModel from '@player/models/weekly/weekly.rush.model';
import WeeklyStatModel from '@player/models/weekly/weekly.model';
import { PlayerForeignKey, PlayerWeeklyForeignKey } from '@constants/nfl/service.constants';
import { Sequelize } from 'sequelize';

jest.mock('@player/models/player.model');
jest.mock('@player/models/weekly/advanced/weekly.adv.def.model');
jest.mock('@player/models/weekly/advanced/weekly.adv.pass.model');
jest.mock('@player/models/weekly/advanced/weekly.adv.rec.model');
jest.mock('@player/models/weekly/advanced/weekly.adv.rush.model');
jest.mock('@player/models/weekly/weekly.def.model');
jest.mock('@player/models/weekly/weekly.kick.model');
jest.mock('@player/models/weekly/nextGen/weekly.nextgen.pass.model');
jest.mock('@player/models/weekly/nextGen/weekly.nextgen.rec.model');
jest.mock('@player/models/weekly/nextGen/weekly.nextgen.rush.model');
jest.mock('@player/models/weekly/weekly.pass.model');
jest.mock('@player/models/weekly/weekly.rec.model');
jest.mock('@player/models/weekly/weekly.rush.model');
jest.mock('@player/models/weekly/weekly.model');


let mockAdvDefSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockAdvDefModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockAdvPassSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockAdvPassModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockAdvRecSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockAdvRecModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockAdvRushSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockAdvRushModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockDefSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockDefModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockKickSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockKickModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockNextGenPassSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockNextGenPassModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockNextGenRecSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockNextGenRecModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockNextGenRushSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockNextGenRushModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockPassSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockPassModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockRecSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockRecModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockRushSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockRushModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockWeeklySchema: jest.SpyInstance<any, [model: unknown, teamModel: unknown], any>;
let mockWeeklyModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;

describe('Init Weekly Models', () => {
    const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        username: 'test',
        password: 'testMe',
        database: 'Postgres',
        port: 255,
    });

    const obj = {};

    beforeEach(() => {        
        mockAdvDefSchema = jest.spyOn(advDefSchema, 'weeklyAdvDefSchema').mockImplementation(() => obj);
        mockAdvDefModelOptions = jest.spyOn(advDefSchema, 'weeklyAdvDefModelOptions').mockImplementation(() => obj);
        mockAdvPassSchema = jest.spyOn(advPassSchema, 'weeklyAdvPassSchema').mockImplementation(() => obj);
        mockAdvPassModelOptions = jest.spyOn(advPassSchema, 'weeklyAdvPassModelOptions').mockImplementation(() => obj);
        mockAdvRecSchema = jest.spyOn(advRecSchema, 'weeklyAdvRecSchema').mockImplementation(() => obj);
        mockAdvRecModelOptions = jest.spyOn(advRecSchema, 'weeklyAdvRecModelOptions').mockImplementation(() => obj);
        mockAdvRushSchema = jest.spyOn(advRushSchema, 'weeklyAdvRushSchema').mockImplementation(() => obj);
        mockAdvRushModelOptions = jest.spyOn(advRushSchema, 'weeklyAdvRushModelOptions').mockImplementation(() => obj);
        mockDefSchema = jest.spyOn(defSchema, 'weeklyDefSchema').mockImplementation(() => obj);
        mockDefModelOptions = jest.spyOn(defSchema, 'weeklyDefModelOptions').mockImplementation(() => obj);
        mockKickSchema = jest.spyOn(kickSchema, 'weeklyKickSchema').mockImplementation(() => obj);
        mockKickModelOptions = jest.spyOn(kickSchema, 'weeklyKickModelOptions').mockImplementation(() => obj);
        mockNextGenPassSchema = jest.spyOn(nextGenPassSchema, 'weeklyNextGenPassSchema').mockImplementation(() => obj);
        mockNextGenPassModelOptions = jest.spyOn(nextGenPassSchema, 'weeklyNextGenPassModelOptions').mockImplementation(() => obj);
        mockNextGenRecSchema = jest.spyOn(nextGenRecSchema, 'weeklyNextGenRecSchema').mockImplementation(() => obj);
        mockNextGenRecModelOptions = jest.spyOn(nextGenRecSchema, 'weeklyNextGenRecModelOptions').mockImplementation(() => obj);
        mockNextGenRushSchema = jest.spyOn(nextGenRushSchema, 'weeklyNextGenRushSchema').mockImplementation(() => obj);
        mockNextGenRushModelOptions = jest.spyOn(nextGenRushSchema, 'weeklyNextGenRushModelOptions').mockImplementation(() => obj);
        mockPassSchema = jest.spyOn(passSchema, 'weeklyPassSchema').mockImplementation(() => obj);
        mockPassModelOptions = jest.spyOn(passSchema, 'weeklyPassModelOptions').mockImplementation(() => obj);
        mockRecSchema = jest.spyOn(recSchema, 'weeklyRecSchema').mockImplementation(() => obj);
        mockRecModelOptions = jest.spyOn(recSchema, 'weeklyRecModelOptions').mockImplementation(() => obj);
        mockRushSchema = jest.spyOn(rushSchema, 'weeklyRushSchema').mockImplementation(() => obj);
        mockRushModelOptions = jest.spyOn(rushSchema, 'weeklyRushModelOptions').mockImplementation(() => obj);
        mockWeeklySchema = jest.spyOn(weeklySchema, 'weeklySchema').mockImplementation(() => obj);
        mockWeeklyModelOptions = jest.spyOn(weeklySchema, 'weeklyModelOptions').mockImplementation(() => obj);
      });

    describe('InitWeeklyModels', () => {
        it('should initialize models', () => {
            iw.InitWeeklyModels(sequelize);
        
            expect(mockWeeklySchema).toHaveBeenCalledWith(PlayerModel, TeamModel);
            expect(mockWeeklyModelOptions).toHaveBeenCalledWith(sequelize);
            expect(WeeklyStatModel.init).toHaveBeenCalledWith(obj, obj);
            expect(mockDefSchema).toHaveBeenCalledTimes(1);
            expect(mockDefModelOptions).toHaveBeenCalledWith(sequelize);
            expect(WeeklyDefStatModel.init).toHaveBeenCalledWith(obj, obj);
            expect(mockKickSchema).toHaveBeenCalledTimes(1);
            expect(mockKickModelOptions).toHaveBeenCalledWith(sequelize);
            expect(WeeklyKickStatModel.init).toHaveBeenCalledWith(obj, obj);
            expect(mockPassSchema).toHaveBeenCalledTimes(1);
            expect(mockPassModelOptions).toHaveBeenCalledWith(sequelize);
            expect(WeeklyPassStatModel.init).toHaveBeenCalledWith(obj, obj);
            expect(mockRecSchema).toHaveBeenCalledTimes(1);
            expect(mockRecModelOptions).toHaveBeenCalledWith(sequelize);
            expect(WeeklyRecStatModel.init).toHaveBeenCalledWith(obj, obj);
            expect(mockRushSchema).toHaveBeenCalledTimes(1);
            expect(mockRushModelOptions).toHaveBeenCalledWith(sequelize);
            expect(WeeklyRushStatModel.init).toHaveBeenCalledWith(obj, obj);

            expect(mockNextGenPassSchema).toHaveBeenCalledTimes(1);
            expect(mockNextGenPassModelOptions).toHaveBeenCalledWith(sequelize);
            expect(WeeklyNextGenPassStatModel.init).toHaveBeenCalledWith(obj, obj);
            expect(mockNextGenRecSchema).toHaveBeenCalledTimes(1);
            expect(mockNextGenRecModelOptions).toHaveBeenCalledWith(sequelize);
            expect(WeeklyNextGenRecStatModel.init).toHaveBeenCalledWith(obj, obj);
            expect(mockNextGenRushSchema).toHaveBeenCalledTimes(1);
            expect(mockNextGenRushModelOptions).toHaveBeenCalledWith(sequelize);
            expect(WeeklyNextGenRushStatModel.init).toHaveBeenCalledWith(obj, obj);

            expect(mockAdvDefSchema).toHaveBeenCalledTimes(1);
            expect(mockAdvDefModelOptions).toHaveBeenCalledWith(sequelize);
            expect(WeeklyAdvDefStatModel.init).toHaveBeenCalledWith(obj, obj);
            expect(mockAdvPassSchema).toHaveBeenCalledTimes(1);
            expect(mockAdvPassModelOptions).toHaveBeenCalledWith(sequelize);
            expect(WeeklyAdvPassStatModel.init).toHaveBeenCalledWith(obj, obj);
            expect(mockAdvRecSchema).toHaveBeenCalledTimes(1);
            expect(mockAdvRecModelOptions).toHaveBeenCalledWith(sequelize);
            expect(WeeklyAdvRecStatModel.init).toHaveBeenCalledWith(obj, obj);
            expect(mockAdvRushSchema).toHaveBeenCalledTimes(1);
            expect(mockAdvRushModelOptions).toHaveBeenCalledWith(sequelize);
            expect(WeeklyAdvRushStatModel.init).toHaveBeenCalledWith(obj, obj);

            expect(WeeklyStatModel.belongsTo).toHaveBeenCalledWith(PlayerModel, PlayerForeignKey);
            expect(WeeklyStatModel.hasOne).toHaveBeenCalledWith(WeeklyDefStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyStatModel.hasOne).toHaveBeenCalledWith(WeeklyKickStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyStatModel.hasOne).toHaveBeenCalledWith(WeeklyPassStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyStatModel.hasOne).toHaveBeenCalledWith(WeeklyRecStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyStatModel.hasOne).toHaveBeenCalledWith(WeeklyRushStatModel, PlayerWeeklyForeignKey);

            expect(WeeklyStatModel.hasOne).toHaveBeenCalledWith(WeeklyAdvDefStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyStatModel.hasOne).toHaveBeenCalledWith(WeeklyAdvPassStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyStatModel.hasOne).toHaveBeenCalledWith(WeeklyAdvRecStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyStatModel.hasOne).toHaveBeenCalledWith(WeeklyAdvRushStatModel, PlayerWeeklyForeignKey);

            expect(WeeklyStatModel.hasOne).toHaveBeenCalledWith(WeeklyNextGenPassStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyStatModel.hasOne).toHaveBeenCalledWith(WeeklyNextGenRecStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyStatModel.hasOne).toHaveBeenCalledWith(WeeklyNextGenRushStatModel, PlayerWeeklyForeignKey);

            expect(WeeklyDefStatModel.belongsTo).toHaveBeenCalledWith(WeeklyStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyKickStatModel.belongsTo).toHaveBeenCalledWith(WeeklyStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyPassStatModel.belongsTo).toHaveBeenCalledWith(WeeklyStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyRecStatModel.belongsTo).toHaveBeenCalledWith(WeeklyStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyRushStatModel.belongsTo).toHaveBeenCalledWith(WeeklyStatModel, PlayerWeeklyForeignKey);

            expect(WeeklyAdvDefStatModel.belongsTo).toHaveBeenCalledWith(WeeklyStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyAdvPassStatModel.belongsTo).toHaveBeenCalledWith(WeeklyStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyAdvRecStatModel.belongsTo).toHaveBeenCalledWith(WeeklyStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyAdvRushStatModel.belongsTo).toHaveBeenCalledWith(WeeklyStatModel, PlayerWeeklyForeignKey);

            expect(WeeklyNextGenPassStatModel.belongsTo).toHaveBeenCalledWith(WeeklyStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyNextGenRecStatModel.belongsTo).toHaveBeenCalledWith(WeeklyStatModel, PlayerWeeklyForeignKey);
            expect(WeeklyNextGenRushStatModel.belongsTo).toHaveBeenCalledWith(WeeklyStatModel, PlayerWeeklyForeignKey);
        });
    });
});