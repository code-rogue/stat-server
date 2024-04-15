import { WeeklyStatQueryModel } from '@interfaces/player/player.query.model';
import { WeeklyNextGenPassDto } from '@interfaces/weekly/nextgen/weekly.nextgen.pass.dto';
import { WeeklyNextGenRecDto } from '@interfaces/weekly/nextgen/weekly.nextgen.rec.dto';
import { WeeklyNextGenRushDto } from '@interfaces/weekly/nextgen/weekly.nextgen.rush.dto';
import {
   WeeklyNextGenPassQueryModel,
   WeeklyNextGenRecQueryModel,
   WeeklyNextGenRushQueryModel,
} from '@interfaces/stats/nextGenStats.query.model';
import {
    WeeklyNextGenPassModelLabel as nextGenPass,
    WeeklyNextGenRecModelLabel as nextGenRec,
    WeeklyNextGenRushModelLabel as nextGenRush,
} from '@constants/nfl/service.constants';

export class WeeklyNextGenDto {
   public pass: WeeklyNextGenPassQueryModel;
   public rec: WeeklyNextGenRecQueryModel;
   public rush: WeeklyNextGenRushQueryModel;

   constructor(week: WeeklyStatQueryModel) {
    if(week[nextGenPass])
        this.pass = new WeeklyNextGenPassDto(week[nextGenPass]);

    if(week[nextGenRec])
        this.rec = new WeeklyNextGenRecDto(week[nextGenRec]);

    if(week[nextGenRush])
        this.rush = new WeeklyNextGenRushDto(week[nextGenRush]);
   }
}