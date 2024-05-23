import {
    BioModelLabel as bio,
    LeagueModelLabel as league,
    TeamModelLabel as team
} from '@constants/nfl/service.constants';
import { PlayerQueryModel } from '@interfaces/player/player.query.model';
import { TeamDto } from '@interfaces/player/team.dto';

export default class PlayerSummaryDto {
   id: number;
   full_name: string;
   career_status: string;
   position_group: string;
   position: string;
   headshot_url: string;
   team: TeamDto;

   constructor(player: PlayerQueryModel) {
       this.id = player.id;
       this.full_name = player.full_name;
       this.career_status = player.career_status;
       this.position = player[league].position;
       this.position_group = player[league].position_group;
       this.headshot_url = player[bio].headshot_url;
       this.team = new TeamDto(player[league][team])
   }
}