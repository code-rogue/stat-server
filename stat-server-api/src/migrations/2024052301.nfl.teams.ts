import { 
    ARI, ATL, BAL, BUF, CAR, CIN, CHI, CLE, DAL, DEN, DET, GB, HOU, IND, JAC, KC,
    LA, LAC, LV, MIA, MIN, NE, NO, NYG, NYJ, PHI, PIT, SF, SEA, TB, TEN, WAS 
} from './models/nfl.team.records';

import type { Migration } from '../umzug';
import { NFLSchema, TeamTable } from '../constants/nfl/service.constants';
import { Team } from './models/nfl.team.model';
import { timestampInsertTrigger, timestampUpdateTrigger } from './models/model.helpers';

export const up: Migration = async ({ context: sequelize }) => {
    const query = sequelize.getQueryInterface();
       
    await Team.sync();

    await query.sequelize.query(timestampInsertTrigger('teams_insert_trigger', NFLSchema, TeamTable));
    await query.sequelize.query(timestampUpdateTrigger('teams_update_trigger', NFLSchema, TeamTable));

    try {
        Team.create(ARI);
        Team.create(ATL);
        Team.create(BAL);
        Team.create(BUF);
        Team.create(CAR);
        Team.create(CIN);
        Team.create(CHI);
        Team.create(CLE);
        Team.create(DAL);
        Team.create(DEN);
        Team.create(DET);
        Team.create(GB);
        Team.create(HOU);
        Team.create(IND);
        Team.create(JAC);
        Team.create(KC);
        Team.create(LA);
        Team.create(LAC);
        Team.create(LV);
        Team.create(MIA);
        Team.create(MIN);
        Team.create(NE);
        Team.create(NO);
        Team.create(NYG);
        Team.create(NYJ);
        Team.create(PHI);
        Team.create(PIT);
        Team.create(SF);
        Team.create(SEA);
        Team.create(TB);
        Team.create(TEN);
        Team.create(WAS);
    } catch (error) {
        console.error('Error creating NFL teams:', error);
    }
    
};

export const down: Migration = async ({ context: sequelize }) => {
    await Team.drop();
};