import {NFL_TEAMS, NFL_TEAM_NAMES} from '@interfaces/enums/teams.enums';

export const TEAM_UNKNOWN = 'Unknown team'

export function teamDisplayName(team_abbr?: string): string {
    if(!team_abbr) return TEAM_UNKNOWN;

    let team = TEAM_UNKNOWN;
    switch (team_abbr.toUpperCase()) {
        case NFL_TEAMS.ARI:
            team = NFL_TEAM_NAMES.ARI;
            break;
        case NFL_TEAMS.ATL:
            team = NFL_TEAM_NAMES.ATL;
            break;
        case NFL_TEAMS.BAL:
            team = NFL_TEAM_NAMES.BAL;
            break;
        case NFL_TEAMS.BUF:
            team = NFL_TEAM_NAMES.BUF;
            break;
        case NFL_TEAMS.CAR:
            team = NFL_TEAM_NAMES.CAR;
            break;
        case NFL_TEAMS.CHI:
            team = NFL_TEAM_NAMES.CHI;
            break;
        case NFL_TEAMS.CIN:
            team = NFL_TEAM_NAMES.CIN;
            break;
        case NFL_TEAMS.CLE:
            team = NFL_TEAM_NAMES.CLE;
            break;
        case NFL_TEAMS.DAL:
            team = NFL_TEAM_NAMES.DAL;
            break;
        case NFL_TEAMS.DEN:
            team = NFL_TEAM_NAMES.DEN;
            break;
        case NFL_TEAMS.DET:
            team = NFL_TEAM_NAMES.DET;
            break;
        case NFL_TEAMS.GB:
            team = NFL_TEAM_NAMES.GB;
            break;
        case NFL_TEAMS.HOU:
            team = NFL_TEAM_NAMES.HOU;
            break;
        case NFL_TEAMS.IND:
            team = NFL_TEAM_NAMES.IND;
            break;
        case NFL_TEAMS.JAC:
            team = NFL_TEAM_NAMES.JAC;
            break;
        case NFL_TEAMS.JAX:
            team = NFL_TEAM_NAMES.JAX;
            break;
        case NFL_TEAMS.KC:
            team = NFL_TEAM_NAMES.KC;
            break;
        case NFL_TEAMS.LA:
            team = NFL_TEAM_NAMES.LA;
            break;
        case NFL_TEAMS.LAC:
            team = NFL_TEAM_NAMES.LAC;
            break;
        case NFL_TEAMS.LV:
            team = NFL_TEAM_NAMES.LV;
            break;
        case NFL_TEAMS.MIA:
            team = NFL_TEAM_NAMES.MIA;
            break;
        case NFL_TEAMS.MIN:
            team = NFL_TEAM_NAMES.MIN;
            break;
        case NFL_TEAMS.NE:
            team = NFL_TEAM_NAMES.NE;
            break;
        case NFL_TEAMS.NO:
            team = NFL_TEAM_NAMES.NO;
            break;
        case NFL_TEAMS.NYG:
            team = NFL_TEAM_NAMES.NYG;
            break;
        case NFL_TEAMS.NYJ:
            team = NFL_TEAM_NAMES.NYJ;
            break;
        case NFL_TEAMS.OAK:
            team = NFL_TEAM_NAMES.OAK;
            break;
        case NFL_TEAMS.PHI:
            team = NFL_TEAM_NAMES.PHI;
            break;
        case NFL_TEAMS.PIT:
            team = NFL_TEAM_NAMES.PIT;
            break;
        case NFL_TEAMS.SD:
            team = NFL_TEAM_NAMES.SD;
            break;
        case NFL_TEAMS.SEA:
            team = NFL_TEAM_NAMES.SEA;
            break;
        case NFL_TEAMS.SF:
            team = NFL_TEAM_NAMES.SF;
            break;
        case NFL_TEAMS.STL:
            team = NFL_TEAM_NAMES.STL;
            break;
        case NFL_TEAMS.TB:
            team = NFL_TEAM_NAMES.TB;
            break;
        case NFL_TEAMS.TEN:
            team = NFL_TEAM_NAMES.TEN;
            break;
        case NFL_TEAMS.WAS:
            team = NFL_TEAM_NAMES.WAS;
            break;
    }

    return team;
}