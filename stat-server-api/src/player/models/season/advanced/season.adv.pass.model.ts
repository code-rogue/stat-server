import { Model } from 'sequelize';

export default class SeasonAdvPassStatModel extends Model {
    public id: number;
    public player_season_id: number;
    public attempts: number;
    public throw_aways: number;
    public spikes: number;
    public drops: number;
    public drop_pct: number;
    public bad_throws: number;
    public bad_throw_pct: number;
    public pocket_time: number;
    public blitzed: number;
    public hurried: number;
    public hit: number;
    public pressured: number;
    public pressured_pct: number;
    public batted_balls: number;
    public on_tgt_throws: number;
    public on_tgt_throws_pct: number;
    public rpo_plays: number;
    public rpo_yards: number;
    public rpo_pass_attempts: number;
    public rpo_pass_yards: number;
    public rpo_rush_attempts: number;
    public rpo_rush_yards: number;
    public pa_pass_attempts: number;
    public pa_pass_yards: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}