import * as tm from '@team/team.utils';

describe('Team utils', () => {
  describe('teamDisplayName', () => {
    it('should return TEAM_UNKNOWN', () => {
      expect(tm.teamDisplayName()).toEqual(tm.TEAM_UNKNOWN);
    });

    it.each([
        ['', tm.TEAM_UNKNOWN],
        [tm.NFL_TEAMS.ARI.toLowerCase(), tm.NFL_TEAM_NAMES.ARI],
        [tm.NFL_TEAMS.ARI, tm.NFL_TEAM_NAMES.ARI],
        [tm.NFL_TEAMS.ATL, tm.NFL_TEAM_NAMES.ATL],
        [tm.NFL_TEAMS.BAL, tm.NFL_TEAM_NAMES.BAL],
        [tm.NFL_TEAMS.BUF, tm.NFL_TEAM_NAMES.BUF],
        [tm.NFL_TEAMS.CAR, tm.NFL_TEAM_NAMES.CAR],
        [tm.NFL_TEAMS.CHI, tm.NFL_TEAM_NAMES.CHI],
        [tm.NFL_TEAMS.CIN, tm.NFL_TEAM_NAMES.CIN],
        [tm.NFL_TEAMS.CLE, tm.NFL_TEAM_NAMES.CLE],
        [tm.NFL_TEAMS.DAL, tm.NFL_TEAM_NAMES.DAL],
        [tm.NFL_TEAMS.DEN, tm.NFL_TEAM_NAMES.DEN],
        [tm.NFL_TEAMS.DET, tm.NFL_TEAM_NAMES.DET],
        [tm.NFL_TEAMS.GB, tm.NFL_TEAM_NAMES.GB],
        [tm.NFL_TEAMS.HOU, tm.NFL_TEAM_NAMES.HOU],
        [tm.NFL_TEAMS.IND, tm.NFL_TEAM_NAMES.IND],
        [tm.NFL_TEAMS.JAC, tm.NFL_TEAM_NAMES.JAC],
        [tm.NFL_TEAMS.JAX, tm.NFL_TEAM_NAMES.JAX],
        [tm.NFL_TEAMS.KC, tm.NFL_TEAM_NAMES.KC],
        [tm.NFL_TEAMS.LA, tm.NFL_TEAM_NAMES.LA],
        [tm.NFL_TEAMS.LAC, tm.NFL_TEAM_NAMES.LAC],
        [tm.NFL_TEAMS.LV, tm.NFL_TEAM_NAMES.LV],
        [tm.NFL_TEAMS.MIA, tm.NFL_TEAM_NAMES.MIA],
        [tm.NFL_TEAMS.MIN, tm.NFL_TEAM_NAMES.MIN],
        [tm.NFL_TEAMS.NE, tm.NFL_TEAM_NAMES.NE],
        [tm.NFL_TEAMS.NO, tm.NFL_TEAM_NAMES.NO],
        [tm.NFL_TEAMS.NYG, tm.NFL_TEAM_NAMES.NYG],
        [tm.NFL_TEAMS.NYJ, tm.NFL_TEAM_NAMES.NYJ],
        [tm.NFL_TEAMS.OAK, tm.NFL_TEAM_NAMES.OAK],
        [tm.NFL_TEAMS.PHI, tm.NFL_TEAM_NAMES.PHI],
        [tm.NFL_TEAMS.PIT, tm.NFL_TEAM_NAMES.PIT],
        [tm.NFL_TEAMS.SD, tm.NFL_TEAM_NAMES.SD],
        [tm.NFL_TEAMS.SEA, tm.NFL_TEAM_NAMES.SEA],
        [tm.NFL_TEAMS.SF, tm.NFL_TEAM_NAMES.SF],
        [tm.NFL_TEAMS.STL, tm.NFL_TEAM_NAMES.STL],
        [tm.NFL_TEAMS.TB, tm.NFL_TEAM_NAMES.TB],
        [tm.NFL_TEAMS.TEN, tm.NFL_TEAM_NAMES.TEN],
        [tm.NFL_TEAMS.WAS, tm.NFL_TEAM_NAMES.WAS],
    ])('should return the team display name - team: %s', async (teamAbbr, teamName) => {
      expect(tm.teamDisplayName(teamAbbr)).toEqual(teamName);      
    });
  });
});