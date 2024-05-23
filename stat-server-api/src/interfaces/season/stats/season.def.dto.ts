import { SeasonDefQueryModel } from '@interfaces/stats/query.model';
import { safeConvertFloat } from '@player/utils/safeConvert.utils';

export class SeasonDefDto {
   public tackles?: number;
   public tackles_solo?: number;
   public tackle_with_assists?: number;
   public tackle_assists?: number;
   public tackles_for_loss?: number;
   public tackles_for_loss_yards?: number;
   public fumbles_forced?: number;
   public sacks?: number;
   public sack_yards?: number;
   public qb_hits?: number;
   public interceptions?: number;
   public interception_yards?: number;
   public pass_defended?: number;
   public tds?: number;
   public fumbles?: number;
   public fumble_recovery_own?: number;
   public fumble_recovery_yards_own?: number;
   public fumble_recovery_opp?: number;
   public fumble_recovery_yards_opp?: number;
   public safety?: number;
   public penalty?: number;
   public penalty_yards?: number;

   constructor(stats?: SeasonDefQueryModel) {
       this.tackles = safeConvertFloat(stats?.tackles);
       this.tackles_solo = safeConvertFloat(stats?.tackles_solo);
       this.tackle_with_assists = safeConvertFloat(stats?.tackle_with_assists);
       this.tackle_assists = safeConvertFloat(stats?.tackle_assists);
       this.tackles_for_loss = safeConvertFloat(stats?.tackles_for_loss);
       this.tackles_for_loss_yards = safeConvertFloat(stats?.tackles_for_loss_yards);
       this.fumbles_forced = safeConvertFloat(stats?.fumbles_forced);
       this.sacks = safeConvertFloat(stats?.sacks);
       this.sack_yards = safeConvertFloat(stats?.sack_yards);
       this.qb_hits = safeConvertFloat(stats?.qb_hits);
       this.interceptions = safeConvertFloat(stats?.interceptions);
       this.interception_yards = safeConvertFloat(stats?.interception_yards);
       this.pass_defended = safeConvertFloat(stats?.pass_defended);
       this.tds = safeConvertFloat(stats?.tds);
       this.fumbles = safeConvertFloat(stats?.fumbles);
       this.fumble_recovery_own = safeConvertFloat(stats?.fumble_recovery_own);
       this.fumble_recovery_yards_own = safeConvertFloat(stats?.fumble_recovery_yards_own);
       this.fumble_recovery_opp = safeConvertFloat(stats?.fumble_recovery_opp);
       this.fumble_recovery_yards_opp = safeConvertFloat(stats?.fumble_recovery_yards_opp);
       this.safety = safeConvertFloat(stats?.safety);
       this.penalty = safeConvertFloat(stats?.penalty);
       this.penalty_yards = safeConvertFloat(stats?.penalty_yards);
   }
}