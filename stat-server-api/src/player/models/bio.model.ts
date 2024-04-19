import { Model } from 'sequelize';

export default class BioModel extends Model {
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