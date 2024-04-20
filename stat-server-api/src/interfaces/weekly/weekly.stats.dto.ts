import { WeeklyStatQueryModel } from '@interfaces/player/player.query.model';
import {
   WeeklyDefQueryModel,
   WeeklyKickQueryModel,
   WeeklyPassQueryModel,
   WeeklyRecQueryModel,
   WeeklyRushQueryModel,
} from '@interfaces/stats/query.model';
import {
    WeeklyDefModelLabel as def,
    WeeklyKickModelLabel as kick,
    WeeklyPassModelLabel as pass,
    WeeklyRecModelLabel as rec,
    WeeklyRushModelLabel as rush,
} from '@constants/nfl/service.constants';
import { WeeklyDefDto } from '@interfaces/weekly/stats/weekly.def.dto';
import { WeeklyKickDto } from '@interfaces/weekly/stats/weekly.kick.dto';
import { WeeklyPassDto } from '@interfaces/weekly/stats/weekly.pass.dto';
import { WeeklyRecDto } from '@interfaces/weekly/stats/weekly.rec.dto';
import { WeeklyRushDto } from '@interfaces/weekly/stats/weekly.rush.dto';

export class WeeklyStatsDto {
   public def: WeeklyDefQueryModel;
   public kick: WeeklyKickQueryModel;
   public pass: WeeklyPassQueryModel;
   public rec: WeeklyRecQueryModel;
   public rush: WeeklyRushQueryModel;

   constructor(week: WeeklyStatQueryModel) {
        if(week[def])
            this.def = new WeeklyDefDto(week[def]);

        if(week[kick])
            this.kick = new WeeklyKickDto(week[kick]);

        if(week[pass])
            this.pass = new WeeklyPassDto(week[pass]);

        if(week[rec])
            this.rec = new WeeklyRecDto(week[rec]);

        if(week[rush])
            this.rush = new WeeklyRushDto(week[rush]);
   }
}