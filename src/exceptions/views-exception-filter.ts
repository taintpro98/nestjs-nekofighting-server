import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import * as Pug from 'pug';
import { buildUrl, getPathNameUrl, getQueryParams } from '../utils';

@Catch()
export class ViewRenderingExceptionFilter implements ExceptionFilter {
  view: string;
  objectNames: string[];
  redirect?: boolean;

  constructor(view: string, objectNames: string[], redirect?: boolean) {
    this.view = view;
    this.objectNames = objectNames;
    this.redirect = redirect;
  }

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let message = '';
    if (exception?.response) {
      if (Array.isArray(exception?.response?.message)) {
        message = exception?.response?.message[0];
      } else {
        message = exception?.response?.message;
      }
    }
    if (!message) {
      message =
        exception.message || 'Something went wrong. Please try again later';
      message = exception.status ? message : 'Internal Server Error';
    }

    const token = await response.generateCsrf();

    console.log('res.locals: ', response.locals);

    const params = {};
    this.objectNames.forEach(async (item) => {
      if (item in request.body) {
        params[item] = request.body[item];
      } else if (item in request.query) {
        params[item] = request.query[item];
      } else {
        const query = getQueryParams(request.headers.referer || request.url);
        if (item in query) {
          params[item] = query[item];
        }
      }
    });
    const html = Pug.renderFile(`${__dirname}/views/${this.view}`, {
      error: message,
      token: token,
      ...params,
    });
    response.header('Content-Type', 'text/html').send(html);
    if (this.redirect) {
      let query = request.query;
      if (!query || !Object.keys(query).length) {
        if (request.headers.referer) {
          query = getQueryParams(request.headers.referer);
        }
      }
      const pathUrl = getPathNameUrl(request.url);
      const redirectUrl = buildUrl(pathUrl, {
        ...query,
      });
      response.redirect(HttpStatus.FOUND, redirectUrl);
      // console.log('redirect_url: ', redirectUrl);
    }
  }
}
