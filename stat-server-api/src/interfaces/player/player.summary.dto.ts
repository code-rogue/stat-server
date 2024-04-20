import {
    BioModelLabel as bio,
    LeagueModelLabel as league
} from '@constants/nfl/service.constants';

import { PlayerQueryModel } from '@interfaces/player/player.query.model';
import { teamDisplayName } from '@team/team.utils';

export default class PlayerSummaryDto {
   id: number;
   full_name: string;
   career_status: string;
   position_group: string;
   position: string;
   team: string;
   team_display_name: string;
   headshot_url: string;

   constructor(player: PlayerQueryModel) {
       this.id = player.id;
       this.full_name = player.full_name;
       this.career_status = player.career_status;
       this.position = player[league].position;
       this.position_group = player[league].position_group;
       this.team = player[league].team;
       this.team_display_name = teamDisplayName(this.team);
       this.headshot_url = player[bio].headshot_url;
   }
}