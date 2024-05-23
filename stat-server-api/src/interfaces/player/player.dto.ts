import {
     BioModelLabel as bio,
     LeagueModelLabel as league,
     TeamModelLabel as team
} from '@constants/nfl/service.constants';

import { PlayerQueryModel } from '@interfaces/player/player.query.model';
import { SeasonDto } from '@interfaces/season/season.dto';
import { TeamDto } from '@interfaces/player/team.dto';

export default class PlayerDto {
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
    public birth_date: Date;
    public college: string;
    public college_conference: string;
    public height: number;
    public weight: number;
    public headshot_url: string;
    public position_group: string;
    public position: string;
    public jersey_number: number;
    public years_of_experience: number;
    public rookie_year: string;
    public draft_team: string;
    public draft_number: string;
    public draft_round: string;
    public season: string;
    public stats: SeasonDto[];
    public team: TeamDto;

    constructor(player: PlayerQueryModel) {
        this.id = player.id;
        this.career_status = player.career_status;
        this.game_status_abbr = player.game_status_abbr;
        this.game_status = player.game_status;
        this.esb_id = player.esb_id;
        this.gsis_id = player.gsis_id;
        this.gsis_it_id = player.gsis_it_id;
        this.smart_id = player.smart_id;
        this.pfr_id = player.pfr_id;
        this.full_name = player.full_name;
        this.first_name = player.first_name;
        this.last_name = player.last_name;
        this.short_name = player.short_name;
        this.suffix = player.suffix;
        this.birth_date = player[bio].birth_date;
        this.college  = player[bio].college;
        this.college_conference = player[bio].college_conference;
        this.height = player[bio].height;
        this.weight = player[bio].weight;
        this.headshot_url = player[bio].headshot_url;
        this.position_group = player[league].position_group;
        this.position = player[league].position;
        this.jersey_number = player[league].jersey_number;
        this.years_of_experience = player[league].years_of_experience;
        this.rookie_year = player[league].rookie_year;
        this.draft_team = player[league].draft_team;
        this.draft_number = player[league].draft_number;
        this.draft_round = player[league].draft_round;
        this.season = player[league].season;
        this.stats = [];
        player.stats?.forEach(season => {
            this.stats.push(new SeasonDto(season));
        })
        this.team = new TeamDto(player[league][team])
    }
}

