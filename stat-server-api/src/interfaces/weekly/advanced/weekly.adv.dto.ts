import { WeeklyStatQueryModel } from '@interfaces/player/player.query.model';
import {
   WeeklyAdvDefQueryModel,
   WeeklyAdvPassQueryModel,
   WeeklyAdvRecQueryModel,
   WeeklyAdvRushQueryModel,
} from '@interfaces/stats/advStats.query.model';
import {
    WeeklyAdvDefModelLabel as advDef,
    WeeklyAdvPassModelLabel as advPass,
    WeeklyAdvRecModelLabel as advRec,
    WeeklyAdvRushModelLabel as advRush,
} from '@constants/nfl/service.constants';
import { WeeklyAdvDefDto } from '@interfaces/weekly/advanced/weekly.adv.def.dto';
import { WeeklyAdvPassDto } from '@interfaces/weekly/advanced/weekly.adv.pass.dto';
import { WeeklyAdvRecDto } from '@interfaces/weekly/advanced/weekly.adv.rec.dto';
import { WeeklyAdvRushDto } from '@interfaces/weekly/advanced/weekly.adv.rush.dto';

export class WeeklyAdvDto {
   public def: WeeklyAdvDefQueryModel;
   public pass: WeeklyAdvPassQueryModel;
   public rec: WeeklyAdvRecQueryModel;
   public rush: WeeklyAdvRushQueryModel;

   constructor(week: WeeklyStatQueryModel) {
        if(week[advDef])
            this.def = new WeeklyAdvDefDto(week[advDef]);

        if(week[advPass])
            this.pass = new WeeklyAdvPassDto(week[advPass]);

        if(week[advRec])
            this.rec = new WeeklyAdvRecDto(week[advRec]);

        if(week[advRush])
            this.rush = new WeeklyAdvRushDto(week[advRush]);
   }
}