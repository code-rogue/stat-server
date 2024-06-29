import { TeamDto } from '@interfaces/player/team.dto';
import { Model } from 'sequelize';

export default class WeeklyStatModel extends Model {
    public id: number;
    public game_id: number;
    public pfr_game_id: number;
    public player_id: number;
    public season: string;
    public week: number;
    public game_type: string;
    public team: TeamDto;
    public opponent: TeamDto;
    public fantasy_points: number;
    public fantasy_points_ppr: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}