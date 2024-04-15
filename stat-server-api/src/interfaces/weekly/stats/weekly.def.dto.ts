import { WeeklyDefQueryModel } from '@interfaces/stats/stats.query.model';

export class WeeklyDefDto {
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

   constructor(stats?: WeeklyDefQueryModel) {
       this.tackles = stats?.tackles;
       this.tackles_solo = stats?.tackles_solo;
       this.tackle_with_assists = stats?.tackle_with_assists;
       this.tackle_assists = stats?.tackle_assists;
       this.tackles_for_loss = stats?.tackles_for_loss;
       this.tackles_for_loss_yards = stats?.tackles_for_loss_yards;
       this.fumbles_forced = stats?.fumbles_forced;
       this.sacks = stats?.sacks;
       this.sack_yards = stats?.sack_yards;
       this.qb_hits = stats?.qb_hits;
       this.interceptions = stats?.interceptions;
       this.interception_yards = stats?.interception_yards;
       this.pass_defended = stats?.pass_defended;
       this.tds = stats?.tds;
       this.fumbles = stats?.fumbles;
       this.fumble_recovery_own = stats?.fumble_recovery_own;
       this.fumble_recovery_yards_own = stats?.fumble_recovery_yards_own;
       this.fumble_recovery_opp = stats?.fumble_recovery_opp;
       this.fumble_recovery_yards_opp = stats?.fumble_recovery_yards_opp;
       this.safety = stats?.safety;
       this.penalty = stats?.penalty;
       this.penalty_yards = stats?.penalty_yards;
   }
}