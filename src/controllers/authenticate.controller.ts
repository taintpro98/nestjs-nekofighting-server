import { Body, Controller, Get, Header, HttpStatus, Post, Query, Render, Request, Response, UseFilters, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticateService } from '@services';
import { Accel3LoginCallbackQueryDto, LoginDefaultDto } from '@dtos';
import { LoginDefaultValidationPipe } from '@validators';
import { ViewRenderingExceptionFilter } from '@exceptions';
import { Accel3LinkGuard } from '@guards';
import { buildUrl, getQueryParams } from '@utils';
import { ConfigService } from '@nestjs/config';

@ApiTags('Authenticate')
@Controller('')
export class AuthenticateController {
  constructor(
    private readonly authenticateService: AuthenticateService,
    private readonly configService: ConfigService
  ) { }

  @Post('/login/default')
  async loginDefault(@Body(LoginDefaultValidationPipe) data: LoginDefaultDto) {
    const response = await this.authenticateService.loginDefault(data);
    return { data: response };
  }

  // @UseGuards(Accel3LinkGuard)
  // @UseFilters(
  //   new ViewRenderingExceptionFilter(
  //     'login.pug',
  //     ['username', 'google_redirect_url', 'register_url'],
  //     true
  //   )
  // )
  // @Post('/login')
  // async login(
  //   @Request() request: any,
  //   @Response() response: any
  // ) {
  //   console.log("request.headers.referer", request.headers.referer)
  //   const referer = (request.headers.referer || request.url) ?? '/';
  //   console.log("referrer", referer)
  //   const queryParams = getQueryParams(referer);
  //   console.log("queryParams", queryParams)
  //   return response.redirect(HttpStatus.FOUND, queryParams.continue_url ?? '/');
  // }

  @Get('/login/accel3')
  @Header('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate')
  @Header('Pragma', 'no-cache')
  @Render('accel3-login.pug')
  async loginForm(
    @Request() request: any,
    @Response() response: any
  ) {
    const oauth_authorization_url = this.configService.get<string>('auth.auth.oauth_authorization_url');
    const client_id = this.configService.get<string>('auth.auth.client_id');
    const accel3_redirect_url = buildUrl(
      oauth_authorization_url,
      {
        client_id,
        response_type: 'code',
        redirect_uri: 'http://localhost:5002/api/auth/callback'
      }
    )
    return {
      accel3_redirect_url,
      error: 'error_message',
    }
  }

  @Get('/auth/callback')
  async accel3LoginCallback(
    @Query() query: Accel3LoginCallbackQueryDto
  ){
    console.log('Accel3LoginCallbackQueryDto', query)
    return;
  }
}
