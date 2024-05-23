import {
    SeasonDefModelLabel as def,
    SeasonKickModelLabel as kick,
    SeasonPassModelLabel as pass,
    SeasonRecModelLabel as rec,
    SeasonRushModelLabel as rush,
} from '@constants/nfl/service.constants';
import { SeasonStatQueryModel } from '@interfaces/player/player.query.model';
import { SeasonDefDto } from '@interfaces/season/stats/season.def.dto';
import { SeasonKickDto } from '@interfaces/season/stats/season.kick.dto';
import { SeasonPassDto } from '@interfaces/season/stats/season.pass.dto';
import { SeasonRecDto } from '@interfaces/season/stats/season.rec.dto';
import { SeasonRushDto } from '@interfaces/season/stats/season.rush.dto';
import { 
    SeasonDefQueryModel, 
    SeasonKickQueryModel, 
    SeasonPassQueryModel, 
    SeasonRecQueryModel, 
    SeasonRushQueryModel 
} from '@interfaces/stats/query.model';
 
 export class SeasonStatsDto {
    public def: SeasonDefQueryModel;
    public kick: SeasonKickQueryModel;
    public pass: SeasonPassQueryModel;
    public rec: SeasonRecQueryModel;
    public rush: SeasonRushQueryModel;
 
    constructor(season: SeasonStatQueryModel) {
        if(season[def])
             this.def = new SeasonDefDto(season[def]);
         
         if(season[kick])
            this.kick = new SeasonKickDto(season[kick]);
     
         if(season[pass])
            this.pass = new SeasonPassDto(season[pass]);
 
         if(season[rec])
             this.rec = new SeasonRecDto(season[rec]);
 
         if(season[rush])
             this.rush = new SeasonRushDto(season[rush]);
    }
 }