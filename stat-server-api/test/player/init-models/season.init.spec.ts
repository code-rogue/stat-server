import * as defSchema from '@player/models/schema/season/advanced/season.adv.def.schema';
import * as is from '@player/init-models/season.init';
import * as passSchema from '@player/models/schema/season/advanced/season.adv.pass.schema';
import * as recSchema from '@player/models/schema/season/advanced/season.adv.rec.schema';
import * as rushSchema from '@player/models/schema/season/advanced/season.adv.rush.schema';
import * as seasonSchema from '@player/models/schema/season/season.schema';

import PlayerModel from '@player/models/player.model';
import SeasonAdvDefStatModel from '@player/models/season/advanced/season.adv.def.model';
import SeasonAdvPassStatModel from '@player/models/season/advanced/season.adv.pass.model';
import SeasonAdvRecStatModel from '@player/models/season/advanced/season.adv.rec.model';
import SeasonAdvRushStatModel from '@player/models/season/advanced/season.adv.rush.model';
import SeasonStatModel from '@player/models/season/season.model';
import { PlayerForeignKey, PlayerSeasonForeignKey } from '@constants/nfl/service.constants';
import { Sequelize } from 'sequelize';

jest.mock('@player/models/player.model');
jest.mock('@player/models/season/advanced/season.adv.def.model');
jest.mock('@player/models/season/advanced/season.adv.pass.model');
jest.mock('@player/models/season/advanced/season.adv.rec.model');
jest.mock('@player/models/season/advanced/season.adv.rush.model');
jest.mock('@player/models/season/season.model');

let mockSeasonSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockSeasonModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockAdvDefSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockAdvDefModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockAdvPassSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockAdvPassModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockAdvRecSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockAdvRecModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockAdvRushSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockAdvRushModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;

describe('Init Season Models', () => {
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
        mockSeasonSchema = jest.spyOn(seasonSchema, 'seasonSchema').mockImplementation(() => obj);
        mockSeasonModelOptions = jest.spyOn(seasonSchema, 'seasonModelOptions').mockImplementation(() => obj);
        mockAdvDefSchema = jest.spyOn(defSchema, 'seasonAdvDefSchema').mockImplementation(() => obj);
        mockAdvDefModelOptions = jest.spyOn(defSchema, 'seasonAdvDefModelOptions').mockImplementation(() => obj);
        mockAdvPassSchema = jest.spyOn(passSchema, 'seasonAdvPassSchema').mockImplementation(() => obj);
        mockAdvPassModelOptions = jest.spyOn(passSchema, 'seasonAdvPassModelOptions').mockImplementation(() => obj);
        mockAdvRecSchema = jest.spyOn(recSchema, 'seasonAdvRecSchema').mockImplementation(() => obj);
        mockAdvRecModelOptions = jest.spyOn(recSchema, 'seasonAdvRecModelOptions').mockImplementation(() => obj);
        mockAdvRushSchema = jest.spyOn(rushSchema, 'seasonAdvRushSchema').mockImplementation(() => obj);
        mockAdvRushModelOptions = jest.spyOn(rushSchema, 'seasonAdvRushModelOptions').mockImplementation(() => obj);
      });

    describe('InitSeasonModels', () => {
        it('should initialize models', () => {
            is.InitSeasonModels(sequelize);
        
            expect(mockSeasonSchema).toHaveBeenCalledWith(PlayerModel);
            expect(mockSeasonModelOptions).toHaveBeenCalledWith(sequelize);
            expect(SeasonStatModel.init).toHaveBeenCalledWith(obj, obj);

            expect(mockAdvDefSchema).toHaveBeenCalledTimes(1);
            expect(mockAdvDefModelOptions).toHaveBeenCalledWith(sequelize);
            expect(SeasonAdvDefStatModel.init).toHaveBeenCalledWith(obj, obj);

            expect(mockAdvPassSchema).toHaveBeenCalledTimes(1);
            expect(mockAdvPassModelOptions).toHaveBeenCalledWith(sequelize);
            expect(SeasonAdvPassStatModel.init).toHaveBeenCalledWith(obj, obj);

            expect(mockAdvRecSchema).toHaveBeenCalledTimes(1);
            expect(mockAdvRecModelOptions).toHaveBeenCalledWith(sequelize);
            expect(SeasonAdvRecStatModel.init).toHaveBeenCalledWith(obj, obj);

            expect(mockAdvRushSchema).toHaveBeenCalledTimes(1);
            expect(mockAdvRushModelOptions).toHaveBeenCalledWith(sequelize);
            expect(SeasonAdvRushStatModel.init).toHaveBeenCalledWith(obj, obj);

            expect(PlayerModel.hasMany).toHaveBeenCalledWith(SeasonStatModel, PlayerForeignKey);
            expect(SeasonStatModel.belongsTo).toHaveBeenCalledWith(PlayerModel, PlayerForeignKey);
            
            expect(SeasonStatModel.hasOne).toHaveBeenCalledWith(SeasonAdvDefStatModel, PlayerSeasonForeignKey);
            expect(SeasonStatModel.hasOne).toHaveBeenCalledWith(SeasonAdvPassStatModel, PlayerSeasonForeignKey);
            expect(SeasonStatModel.hasOne).toHaveBeenCalledWith(SeasonAdvRecStatModel, PlayerSeasonForeignKey);
            expect(SeasonStatModel.hasOne).toHaveBeenCalledWith(SeasonAdvRushStatModel, PlayerSeasonForeignKey);
            expect(SeasonAdvDefStatModel.belongsTo).toHaveBeenCalledWith(SeasonStatModel, PlayerSeasonForeignKey);
            expect(SeasonAdvPassStatModel.belongsTo).toHaveBeenCalledWith(SeasonStatModel, PlayerSeasonForeignKey);
            expect(SeasonAdvRecStatModel.belongsTo).toHaveBeenCalledWith(SeasonStatModel, PlayerSeasonForeignKey);
            expect(SeasonAdvRushStatModel.belongsTo).toHaveBeenCalledWith(SeasonStatModel, PlayerSeasonForeignKey);
        });
    });
});