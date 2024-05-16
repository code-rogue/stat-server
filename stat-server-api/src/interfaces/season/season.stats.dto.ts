import {
    SeasonDefModelLabel as def,
    SeasonKickModelLabel as kick,
    SeasonPassModelLabel as pass,
    SeasonRecModelLabel as rec,
    SeasonRushModelLabel as rush,
} from '@constants/nfl/service.constants';
import { SeasonStatQueryModel } from '@interfaces/player/player.query.model';
import { WeeklyDefDto } from '@interfaces/weekly/stats/weekly.def.dto';
import { WeeklyKickDto } from '@interfaces/weekly/stats/weekly.kick.dto';
import { WeeklyPassDto } from '@interfaces/weekly/stats/weekly.pass.dto';
import { WeeklyRecDto } from '@interfaces/weekly/stats/weekly.rec.dto';
import { WeeklyRushDto } from '@interfaces/weekly/stats/weekly.rush.dto';
import { 
    WeeklyDefQueryModel, 
    WeeklyKickQueryModel, 
    WeeklyPassQueryModel, 
    WeeklyRecQueryModel, 
    WeeklyRushQueryModel 
} from '@interfaces/stats/query.model';
 
 export class SeasonStatsDto {
    public def: WeeklyDefQueryModel;
    public kick: WeeklyKickQueryModel;
    public pass: WeeklyPassQueryModel;
    public rec: WeeklyRecQueryModel;
    public rush: WeeklyRushQueryModel;
 
    constructor(season: SeasonStatQueryModel) {
         if(season[def])
             this.def = new WeeklyDefDto(season[def]);
         
         if(season[kick])
            this.kick = new WeeklyKickDto(season[kick]);
     
         if(season[pass])
            this.pass = new WeeklyPassDto(season[pass]);
 
         if(season[rec])
             this.rec = new WeeklyRecDto(season[rec]);
 
         if(season[rush])
             this.rush = new WeeklyRushDto(season[rush]);
    }
 }