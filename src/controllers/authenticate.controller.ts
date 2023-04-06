import { Body, Controller, Get, HttpStatus, Post, Request, Response, UseFilters, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticateService } from '@services';
import { LoginDefaultDto } from '@dtos';
import { LoginDefaultValidationPipe } from '@validators';
import { ViewRenderingExceptionFilter } from '@exceptions';
import { Accel3LinkGuard } from '@guards';
import { getQueryParams } from '@utils';

@ApiTags('Authenticate')
@Controller('')
export class AuthenticateController {
  constructor(private readonly authenticateService: AuthenticateService) {}

  @Post('/login/default')
  async loginDefault(@Body(LoginDefaultValidationPipe) data: LoginDefaultDto) {
    const response = await this.authenticateService.loginDefault(data);
    return { data: response };
  }

  @UseGuards(Accel3LinkGuard)
  @UseFilters(
    new ViewRenderingExceptionFilter(
      'login.pug',
      ['username', 'google_redirect_url', 'register_url'],
      true
    )
  )
  @Post('/login')
  async login(
    @Request() request: any,
    @Response() response: any
  ){
    console.log("request.headers.referer", request.headers.referer)
    const referer = (request.headers.referer || request.url) ?? '/';
    console.log("referrer", referer)
    const queryParams = getQueryParams(referer);
    console.log("queryParams", queryParams)
    return response.redirect(HttpStatus.FOUND, queryParams.continue_url ?? '/');
  }
}
