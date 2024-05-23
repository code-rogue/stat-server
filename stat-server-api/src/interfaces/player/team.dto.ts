import { TeamQueryModel } from "@interfaces/player//team.query.model";

export class TeamDto {
   public id?: number;
   public name?: string;
   public full_name?: string;
   public logo_url?: string;
   
    constructor(teamData: TeamQueryModel) {
        this.id = teamData.id;
        this.name = teamData.name;
        this.full_name = teamData.full_name;
        this.logo_url = teamData.logo_url;
    }
}