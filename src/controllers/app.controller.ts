import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HealthCheck')
@Controller('/')
export class AppController {
  constructor() {}
  @Get()
  async healthCheck() {
    return { status: HttpStatus.OK };
  }
}
