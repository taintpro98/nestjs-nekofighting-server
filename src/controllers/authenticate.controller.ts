import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticateService } from '@services/authenticate.service';
import { RegisterNormalDto } from '@dtos';
import { RegisterNormalValidationPipe } from '@validators';

@ApiTags('Authenticate')
@Controller('')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @Post('/register/normal')
  async registerNormal(
    @Body(RegisterNormalValidationPipe) data: RegisterNormalDto,
  ) {
    const response = await this.authenticateService.registerNormal(data);
    return { data: response };
  }
}
