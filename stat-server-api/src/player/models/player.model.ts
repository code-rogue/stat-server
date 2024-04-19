import { Model } from 'sequelize';

export default class PlayerModel extends Model {
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