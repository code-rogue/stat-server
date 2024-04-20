import {
   SeasonAdvDefQueryModel,
   SeasonAdvPassQueryModel,
   SeasonAdvRecQueryModel,
   SeasonAdvRushQueryModel,
} from '@interfaces/stats/adv.query.model';
import {
    SeasonAdvDefModelLabel as advDef,
    SeasonAdvPassModelLabel as advPass,
    SeasonAdvRecModelLabel as advRec,
    SeasonAdvRushModelLabel as advRush,
} from '@constants/nfl/service.constants';
import { SeasonAdvDefDto } from '@interfaces/season/season.adv.def.dto';
import { SeasonAdvPassDto } from '@interfaces/season/season.adv.pass.dto';
import { SeasonAdvRecDto } from '@interfaces/season/season.adv.rec.dto';
import { SeasonAdvRushDto } from '@interfaces/season/season.adv.rush.dto';
import { SeasonStatQueryModel } from '@interfaces/player/player.query.model';

export class SeasonAdvDto {
   public def: SeasonAdvDefQueryModel;
   public pass: SeasonAdvPassQueryModel;
   public rec: SeasonAdvRecQueryModel;
   public rush: SeasonAdvRushQueryModel;

   constructor(season: SeasonStatQueryModel) {
        if(season[advDef])
            this.def = new SeasonAdvDefDto(season[advDef]);
    
        if(season[advPass])
           this.pass = new SeasonAdvPassDto(season[advPass]);

        if(season[advRec])
            this.rec = new SeasonAdvRecDto(season[advRec]);

        if(season[advRush])
            this.rush = new SeasonAdvRushDto(season[advRush]);
   }
}