import { SeasonAdvPassQueryModel } from '@interfaces/stats/advStats.query.model';

export class SeasonAdvPassDto {
   public attempts?: number;
   public throw_aways?: number;
   public spikes?: number;
   public drops?: number;
   public drop_pct?: number;
   public bad_throws?: number;
   public bad_throw_pct?: number;
   public pocket_time?: number;
   public blitzed?: number;
   public hurried?: number;
   public hit?: number;
   public pressured?: number;
   public pressured_pct?: number;
   public batted_balls?: number;
   public on_tgt_throws?: number;
   public on_tgt_throws_pct?: number;
   public rpo_plays?: number;
   public rpo_yards?: number;
   public rpo_pass_attempts?: number;
   public rpo_pass_yards?: number;
   public rpo_rush_attempts?: number;
   public rpo_rush_yards?: number;
   public pa_pass_attempts?: number;
   public pa_pass_yards?: number;

   constructor(advStats?: SeasonAdvPassQueryModel) {
       this.attempts = advStats?.attempts;
       this.throw_aways = advStats?.throw_aways;
       this.spikes = advStats?.spikes;
       this.drops = advStats?.drops;
       this.drop_pct = advStats?.drop_pct;
       this.bad_throws = advStats?.bad_throws;
       this.bad_throw_pct = advStats?.bad_throw_pct;
       this.pocket_time = advStats?.pocket_time;
       this.blitzed = advStats?.blitzed;
       this.hurried = advStats?.hurried;
       this.hit = advStats?.hit;
       this.pressured = advStats?.pressured;
       this.pressured_pct = advStats?.pressured_pct;
       this.batted_balls = advStats?.batted_balls;
       this.on_tgt_throws = advStats?.on_tgt_throws;
       this.on_tgt_throws_pct = advStats?.on_tgt_throws_pct;
       this.rpo_plays = advStats?.rpo_plays;
       this.rpo_yards = advStats?.rpo_yards;
       this.rpo_pass_attempts = advStats?.rpo_pass_attempts;
       this.rpo_pass_yards = advStats?.rpo_pass_yards;
       this.rpo_rush_attempts = advStats?.rpo_rush_attempts;
       this.rpo_rush_yards = advStats?.rpo_rush_yards;
       this.pa_pass_attempts = advStats?.pa_pass_attempts;
       this.pa_pass_yards = advStats?.pa_pass_yards;
   }
}