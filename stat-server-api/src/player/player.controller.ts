import {
    Controller,
    Get,
    Param,
    Query,
  } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@auth/auth.guard';
import { PlayerQueryAPI, PlayerQueryDto } from '@interfaces/player/player.query.dto';
import { PlayerService } from '@player/player.service';

@Controller('players')
@ApiTags('Players')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  //@UseGuards(AuthGuard)
  @Get('')
  @ApiOperation({ summary: 'Return a summary collection of players' })
  getPlayers(@Query() query: PlayerQueryDto) {
    const playerQueryAPI = new PlayerQueryAPI(query)
    return this.playerService.getAll(playerQueryAPI);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a full player resource' })
  getPlayerById(@Param('id') id: number) {
    return this.playerService.getById(id);
  }

  @Get(':id/stats/seasons/')
  @ApiOperation({ summary: 'Return season stats for player resource' })
  getPlayerSeasonStats(@Param('id') id: number) {
    return this.playerService.seasonStats(id);
  }

  @Get(':id/stats/seasons/:season/weeks')
  @ApiOperation({ summary: 'Return weekly stats for a single season for the player resource' })
  getPlayerSeasonWeeklyStats(@Param('id') id: number, @Param('season') season: string) {
    return this.playerService.seasonWeeklyStats(id, season);
  }
}