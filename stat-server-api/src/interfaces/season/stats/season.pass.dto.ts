import { SeasonPassQueryModel } from '@interfaces/stats/query.model';
import { safeConvertFloat, safeConvertInt} from '@player/utils/safeConvert.utils';

export class SeasonPassDto {
   public attempts?: number;
   public completions?: number;
   public pass_yards?: number;
   public pass_yards_after_catch?: number;
   public pass_air_yards?: number;
   public pass_air_conversion_ratio?: number;
   public pass_first_downs?: number;
   public dakota?: number;
   public pass_epa?: number;
   public pass_tds?: number;
   public pass_two_pt_conversions?: number;
   public interceptions?: number;
   public sacks?: number;
   public sack_yards?: number;
   public sack_fumbles?: number;
   public sack_fumbles_lost?: number;

   constructor(stats?: SeasonPassQueryModel) {
      this.attempts = safeConvertInt(stats?.attempts);
      this.completions = safeConvertInt(stats?.completions);
      this.pass_yards = safeConvertInt(stats?.pass_yards);
      this.pass_yards_after_catch = safeConvertInt(stats?.pass_yards_after_catch);
      this.pass_air_yards = safeConvertInt(stats?.pass_air_yards);
      this.pass_air_conversion_ratio = safeConvertFloat(stats?.pass_air_conversion_ratio);
      this.pass_first_downs = safeConvertInt(stats?.pass_first_downs);
      this.dakota = safeConvertFloat(stats?.dakota);
      this.pass_epa = safeConvertFloat(stats?.pass_epa);
      this.pass_tds = safeConvertInt(stats?.pass_tds);
      this.pass_two_pt_conversions = safeConvertInt(stats?.pass_two_pt_conversions);
      this.interceptions = safeConvertInt(stats?.interceptions);
      this.sacks = safeConvertInt(stats?.sacks);
      this.sack_yards = safeConvertInt(stats?.sack_yards);
      this.sack_fumbles = safeConvertInt(stats?.sack_fumbles);
      this.sack_fumbles_lost = safeConvertInt(stats?.sack_fumbles_lost);
   }
}