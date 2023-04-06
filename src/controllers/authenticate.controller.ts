import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticateService } from '@services';
import { LoginDefaultDto } from '@dtos';
import { LoginDefaultValidationPipe } from '@validators';

@ApiTags('Authenticate')
@Controller('')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @Post('/login/default')
  async loginDefault(@Body(LoginDefaultValidationPipe) data: LoginDefaultDto) {
    const response = await this.authenticateService.loginDefault(data);
    return { data: response };
  }
}
