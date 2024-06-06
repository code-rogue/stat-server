import * as ut from '@player/utils/player.utils';
import { PlayerQueryModel } from '@interfaces/player/player.query.model';
import { NFL_POSITION_GROUPS } from '@interfaces/enums/position_groups.enums';

describe('Player Utils', () => {
    const player = {
        id: 1,
        career_status: 'ACT',
        game_status_abbr: 'ACT',
        game_status: 'Active',
        esb_id: '',
        gsis_id: '00-0030506',
        gsis_it_id: '',
        smart_id: '',
        pfr_id: 'KelcTr00',
        full_name: 'Travis Kelce',
        first_name: 'Travis',
        last_name: 'Kelce',
        short_name: 'T. Kelce',
        suffix:  '',
        league: {
            position_group: NFL_POSITION_GROUPS.DB,
            position: 'TE',
        }
    } as PlayerQueryModel;

    describe('isOffensivePlayer', () => {
        it.each([
            [undefined, false],
            [NFL_POSITION_GROUPS.DB, false],
            [NFL_POSITION_GROUPS.DL, false],
            [NFL_POSITION_GROUPS.LB, false],
            [NFL_POSITION_GROUPS.OL, true],
            [NFL_POSITION_GROUPS.QB, true],
            [NFL_POSITION_GROUPS.RB, true],
            [NFL_POSITION_GROUPS.SPEC, false],
            [NFL_POSITION_GROUPS.TE, true],
            [NFL_POSITION_GROUPS.WR, true],            
        ])('isOffensivePlayer when positionGroup %s', (positionGroup, result) => {
            player.league.position_group = positionGroup
            expect(ut.isOffensivePlayer(player)).toEqual(result);
            
        });
    });

    describe('isDefensivePlayer', () => {
        it.each([
            [undefined, false],
            [NFL_POSITION_GROUPS.DB, true],
            [NFL_POSITION_GROUPS.DL, true],
            [NFL_POSITION_GROUPS.LB, true],
            [NFL_POSITION_GROUPS.OL, false],
            [NFL_POSITION_GROUPS.QB, false],
            [NFL_POSITION_GROUPS.RB, false],
            [NFL_POSITION_GROUPS.SPEC, false],
            [NFL_POSITION_GROUPS.TE, false],
            [NFL_POSITION_GROUPS.WR, false],
        ])('isDefensivePlayer when positionGroup %s', (positionGroup, result) => {
            player.league.position_group = positionGroup
            expect(ut.isDefensivePlayer(player)).toEqual(result);
            
        });
    });

    describe('isKicker', () => {
        it.each([
            [undefined, false],
            ['', false],
            ['k', false],
            ['K', true],
        ])('isKicker when position %s', (position, result) => {
            player.league.position = position
            expect(ut.isKicker(player)).toEqual(result);
            
        });
    });
});