import { Model } from 'sequelize';

export default class SeasonDefStatModel extends Model {
    public id: number;
    public player_id: number;
    public season: string;
    public fantasy_points: number;
    public fantasy_points_ppr: number;
    public tackles: number;
    public tackles_solo: number;
    public tackle_with_assists: number;
    public tackle_assists: number;
    public tackles_for_loss: number;
    public tackles_for_loss_yards: number;
    public fumbles_forced: number;
    public sacks: number;
    public sack_yards: number;
    public qb_hits: number;
    public interceptions: number;
    public interception_yards: number;
    public pass_defended: number;
    public tds: number;
    public fumbles: number;
    public fumble_recovery_own: number;
    public fumble_recovery_yards_own: number;
    public fumble_recovery_opp: number;
    public fumble_recovery_yards_opp: number;
    public safety: number;
    public penalty: number;
    public penalty_yards: number;
}