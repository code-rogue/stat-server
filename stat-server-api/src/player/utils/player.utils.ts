import { PlayerQueryModel } from '@interfaces/player/player.query.model';
import { NFL_POSITION_GROUPS } from '@interfaces/enums/position_groups.enums';

export function isOffensivePlayer(player: PlayerQueryModel): boolean {
    switch (player.league?.position_group) {
        case NFL_POSITION_GROUPS.QB:
        case NFL_POSITION_GROUPS.OL:
        case NFL_POSITION_GROUPS.RB:
        case NFL_POSITION_GROUPS.TE:
        case NFL_POSITION_GROUPS.WR:
            return true;
        default:
            return false;
    }
}

export function isDefensivePlayer(player: PlayerQueryModel): boolean {
    switch (player.league?.position_group) {
        case NFL_POSITION_GROUPS.DB:
        case NFL_POSITION_GROUPS.DL:
        case NFL_POSITION_GROUPS.LB:
            return true;
        default:
            return false;
    }
}

export function isKicker(player: PlayerQueryModel): boolean {
    if (player.league?.position == "K")
        return true;
            
    return false;
}