import { Model } from 'sequelize';

export default class LeagueModel extends Model {
    public id: number;
    public player_id: number;
    public position_group: string;
    public position: string;
    public jersey_number: number;
    public years_of_experience: number;
    public team_id: number;
    public rookie_year: string;
    public draft_team_id: number;
    public draft_number: string;
    public draft_round: string;
    public season: number;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}