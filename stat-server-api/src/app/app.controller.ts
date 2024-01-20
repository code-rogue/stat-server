import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from '@app/app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @ApiOperation({ summary: 'Home Page' })
  getProfile(@Request() req) {
    return this.appService.getHome();
  }
}
