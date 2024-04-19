import { Model } from 'sequelize';

export default class SeasonAdvDefStatModel extends Model {
    public id: number;
    public player_season_id: number;
    public interceptions: number;
    public targets: number;
    public completions_allowed: number;
    public completions_pct: number;
    public yards_allowed: number;
    public yards_allowed_per_cmp: number;
    public yards_allowed_per_tgt: number;
    public tds_allowed: number;
    public passer_rating_allowed: number;
    public adot: number;
    public air_yards_completed: number;
    public yards_after_catch: number;
    public blitzed: number;
    public hurried: number;
    public qbkd: number;
    public sacks: number;
    public pressures: number;
    public tackles_combined: number;
    public tackles_missed: number;
    public tackles_missed_pct?: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}