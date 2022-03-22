import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ operationId: 'getHello' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
