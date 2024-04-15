const TEAM_UNKNOWN = 'Unknown team'

export enum NFL_TEAMS {
    ARI = 'ARI',
    ATL = 'ATL',
    BAL = 'BAL',
    BUF = 'BUF',
    CAR = 'CAR',
    CHI = 'CHI',
    CIN = 'CIN',
    CLE = 'CLE',
    DAL = 'DAL',
    DEN = 'DEN',
    DET = 'DET',
    GB = 'GB',
    HOU = 'HOU',
    IND = 'IND',
    JAC = 'JAC',
    JAX = 'JAX',
    KC = 'KC',
    LA = 'LA',
    LAC = 'LAC',
    LV = 'LV',
    MIA = 'MIA',
    MIN = 'MIN',
    NE = 'NE',
    NO = 'NO',
    NYG = 'NYG',
    NYJ = 'NYJ',
    OAK = 'OAK',
    PHI = 'PHI',
    PIT = 'PIT',
    SD = 'SD',
    SEA = 'SEA',
    SF = 'SF',
    STL = 'STL',
    TB = 'TB',
    TEN = 'TEN',
    WAS = 'WAS',
}

export enum NFL_TEAM_NAMES {
    ARI = 'Arizona Cardinals',
    ATL = 'Atlanta Falcons',
    BAL = 'Balitmore Ravens',
    BUF = 'Buffalo Bills',
    CAR = 'Carolina Panthers',
    CHI = 'Chicago Bears',
    CIN = 'Cincinnati Bengals',
    CLE = 'Cleveland Bronws',
    DAL = 'Dallas Cowboys',
    DEN = 'Denver Broncos',
    DET = 'Detroit Lions',
    GB = 'Green Bay Packers',
    HOU = 'Houston Texans',
    IND = 'Indianapolis Colts',
    JAC = 'Jacksonville Jaguars',
    JAX = 'Jacksonville Jaguars',
    KC = 'Kansas City Chiefs',
    LA = 'Los Angeles Rams',
    LAC = 'Los Angeles Chargers',
    LV = 'Las Vegas Raiders',
    MIA = 'Miami Dolphins',
    MIN = 'Minnesota Vikings',
    NE = 'New England Patriots',
    NO = 'New Orleans Saints',
    NYG = 'New York Giants',
    NYJ = 'New York Jets',
    OAK = 'Las Vegas Raiders',
    PHI = 'Philadelphia Eagles',
    PIT = 'Pittsburgh Steelers',
    SD = 'Los Angeles Chargers',
    SEA = 'Seattle Seahawks',
    SF = 'San Fransico 49ers',
    STL = 'Los Angeles Rams',
    TB = 'Tampa Bay Buccaneers',
    TEN = 'Tennessee Titans',
    WAS = 'Washington Commanders',
}
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