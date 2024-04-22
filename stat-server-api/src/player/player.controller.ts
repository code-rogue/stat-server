import {
    Controller,
    Get,
    Param,
    Query,
    UseGuards,
  } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@auth/auth.guard';
import PlayerQueryAPI from '@interfaces/player/player.query.api';
import PlayerQueryDto from '@interfaces/player/player.query.dto';
import { PlayerService } from '@player/player.service';

@Controller('players')
@ApiTags('Players')
@UseGuards(AuthGuard)
export class PlayerController {
  constructor(private playerService: PlayerService) {}
  
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

  @Get(':id/seasons/')
  @ApiOperation({ summary: 'Return a collection of season stats for a player resource' })
  getPlayerSeasonStats(@Param('id') id: number) {
    return this.playerService.seasonStats(id);
  }

  @Get(':id/stats/seasons/:season')
  @ApiOperation({ summary: 'Return a collection of weekly stats for a single season for the player resource' })
  getPlayerSeasonWeeklyStats(@Param('id') id: number, @Param('season') season: string) {
    return this.playerService.seasonWeeklyStats(id, season);
  }
}