import * as im from '@player/init-models/player.init';
import * as is from '@player/init-models/season.init';
import * as iw from '@player/init-models/weekly.init';
import * as pSchema from '@player/models/schema/player.schema';
import * as lSchema from '@player/models/schema/league.schema';
import * as bSchema from '@player/models/schema/bio.schema';

import BioModel from '@player/models/bio.model';
import LeagueModel from '@player/models/league.model';
import PlayerModel from '@player/models/player.model';
import { PlayerForeignKey } from '@constants/nfl/service.constants';
import { Sequelize } from 'sequelize';

jest.mock('@player/models/bio.model');
jest.mock('@player/models/league.model');
jest.mock('@player/models/player.model');

let mockBioSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockBioModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockLeagueSchema: jest.SpyInstance<any, [model: unknown], any>;
let mockLeagueModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockPlayerSchema: jest.SpyInstance<any, [], any>;
let mockPlayerModelOptions: jest.SpyInstance<any, [sequelize: Sequelize], any>;
let mockInitSeasonModels: jest.SpyInstance<void, [sequelize: Sequelize], any>;
let mockInitWeeklyModels: jest.SpyInstance<void, [sequelize: Sequelize], any>;

describe('Init Player Models', () => {
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
        mockBioSchema = jest.spyOn(bSchema, 'bioSchema').mockImplementation(() => obj);
        mockBioModelOptions = jest.spyOn(bSchema, 'bioModelOptions').mockImplementation(() => obj);
        mockLeagueSchema = jest.spyOn(lSchema, 'leagueSchema').mockImplementation(() => obj);
        mockLeagueModelOptions = jest.spyOn(lSchema, 'leagueModelOptions').mockImplementation(() => obj);
        mockPlayerSchema = jest.spyOn(pSchema, 'playerSchema').mockImplementation(() => obj);
        mockPlayerModelOptions = jest.spyOn(pSchema, 'playerModelOptions').mockImplementation(() => obj);
        mockInitSeasonModels = jest.spyOn(is, 'InitSeasonModels').mockImplementation();
        mockInitWeeklyModels = jest.spyOn(iw, 'InitWeeklyModels').mockImplementation();
      });

    describe('InitPlayerModels', () => {
        it('should initialize models', () => {
            im.InitPlayerModels(sequelize);
        
            expect(mockPlayerSchema).toHaveBeenCalledTimes(1);
            expect(mockPlayerModelOptions).toHaveBeenCalledWith(sequelize);                      
            expect(PlayerModel.init).toHaveBeenCalledWith(obj, obj);

            expect(mockBioSchema).toHaveBeenCalledTimes(1);
            expect(mockBioModelOptions).toHaveBeenCalledWith(sequelize);            
            expect(BioModel.init).toHaveBeenCalledWith(obj, obj);

            expect(mockLeagueSchema).toHaveBeenCalledTimes(1);
            expect(mockLeagueModelOptions).toHaveBeenCalledWith(sequelize);
            expect(LeagueModel.init).toHaveBeenCalledWith(obj, obj);

            expect(PlayerModel.hasOne).toHaveBeenCalledWith(BioModel, PlayerForeignKey);
            expect(PlayerModel.hasOne).toHaveBeenCalledWith(LeagueModel, PlayerForeignKey);
            expect(BioModel.belongsTo).toHaveBeenCalledWith(PlayerModel, PlayerForeignKey);
            expect(LeagueModel.belongsTo).toHaveBeenCalledWith(PlayerModel, PlayerForeignKey);

            expect(mockInitSeasonModels).toHaveBeenCalledWith(sequelize);
            expect(mockInitWeeklyModels).toHaveBeenCalledWith(sequelize);
        });
    });
});