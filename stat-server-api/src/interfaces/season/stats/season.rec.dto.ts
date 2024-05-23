import { SeasonRecQueryModel } from '@interfaces/stats/query.model';
import { safeConvertFloat, safeConvertInt} from '@player/utils/safeConvert.utils';

export class SeasonRecDto {
    public targets?: number;
    public receptions?: number;
    public target_share?: number;
    public rec_yards?: number;
    public rec_yards_after_catch?: number;
    public rec_air_yards?: number;
    public rec_air_yards_share?: number;
    public rec_air_conversion_ratio?: number;
    public weighted_opportunity_rating?: number;
    public rec_epa?: number;
    public rec_tds?: number;
    public rec_two_pt_conversions?: number;
    public rec_first_downs?: number;
    public rec_fumbles?: number;
    public rec_fumbles_lost?: number;

    constructor(stats?: SeasonRecQueryModel) {
        this.targets = safeConvertInt(stats?.targets);
        this.receptions = safeConvertInt(stats?.receptions);
        this.target_share = safeConvertFloat(stats?.target_share);
        this.rec_yards = safeConvertFloat(stats?.rec_yards);
        this.rec_yards_after_catch = safeConvertFloat(stats?.rec_yards_after_catch);
        this.rec_air_yards = safeConvertFloat(stats?.rec_air_yards);
        this.rec_air_yards_share = safeConvertFloat(stats?.rec_air_yards_share);
        this.rec_air_conversion_ratio = safeConvertFloat(stats?.rec_air_conversion_ratio);
        this.weighted_opportunity_rating = safeConvertFloat(stats?.weighted_opportunity_rating);
        this.rec_epa = safeConvertFloat(stats?.rec_epa);
        this.rec_tds = safeConvertInt(stats?.rec_tds);
        this.rec_two_pt_conversions = safeConvertInt(stats?.rec_two_pt_conversions);
        this.rec_first_downs = safeConvertInt(stats?.rec_first_downs);
        this.rec_fumbles = safeConvertInt(stats?.rec_fumbles);
        this.rec_fumbles_lost = safeConvertInt(stats?.rec_fumbles_lost);
    }
}