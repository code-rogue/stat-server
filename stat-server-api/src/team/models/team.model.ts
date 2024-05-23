import { Model } from 'sequelize';

export default class TeamModel extends Model {
    public id: number;
    public name: string;
    public full_name: string;
    public logo_url: string;
    public readonly created_date: Date;
    public readonly last_modified: Date;
}