import { Model } from 'sequelize';

export class PlayerModel extends Model {
    public id: number;
    public career_status: string;
    public game_status_abbr: string;
    public game_status: string;
    public esb_id: string;
    public gsis_id: string;
    public gsis_it_id: string;
    public smart_id: string;
    public pfr_id: string;
    public full_name: string;
    public first_name: string;
    public last_name: string;
    public short_name: string;
    public suffix: string;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}

export class BioModel extends Model {
    public id: number;
    public player_id: number;
    public birth_date: Date;
    public college: string;
    public college_conference: string;
    public height: number;
    public weight: number;
    public headshot_url: string;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}

export class LeagueModel extends Model {
    public id: number;
    public player_id: number;
    public position_group: string;
    public position: string;
    public jersey_number: number;
    public years_of_experience: number;
    public team: string;
    public team_seq: string;
    public team_id: string;
    public rookie_year: string;
    public draft_team: string;
    public draft_number: string;
    public draft_round: string;
    public season: string;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}