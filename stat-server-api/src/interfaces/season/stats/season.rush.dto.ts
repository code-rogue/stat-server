import { SeasonRushQueryModel } from '@interfaces/stats/query.model';
import { safeConvertFloat, safeConvertInt} from '@player/utils/safeConvert.utils';

export class SeasonRushDto {
    public carries?: number;
    public rush_yards?: number;
    public rush_first_downs?: number;
    public rush_epa?: number;
    public rush_tds?: number;
    public rush_two_pt_conversions?: number;
    public rush_fumbles?: number;
    public rush_fumbles_lost?: number;
    public special_teams_tds?: number;

    constructor(stats?: SeasonRushQueryModel) {
        this.carries = safeConvertInt(stats?.carries);
        this.rush_yards = safeConvertFloat(stats?.rush_yards);
        this.rush_first_downs = safeConvertInt(stats?.rush_first_downs);
        this.rush_epa = safeConvertFloat(stats?.rush_epa);
        this.rush_tds = safeConvertInt(stats?.rush_tds);
        this.rush_two_pt_conversions = safeConvertInt(stats?.rush_two_pt_conversions);
        this.rush_fumbles = safeConvertInt(stats?.rush_fumbles);
        this.rush_fumbles_lost = safeConvertInt(stats?.rush_fumbles_lost);
        this.special_teams_tds = safeConvertInt(stats?.special_teams_tds);
    }
}