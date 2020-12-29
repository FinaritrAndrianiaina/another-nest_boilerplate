import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';


@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  async catch(
    exception:  HttpException,
    host: ArgumentsHost,
  ): Promise<void> {
	  const ctx = host.switchToHttp();
	  const response: Response = ctx.getResponse();
	  const request: Request = ctx.getRequest();
	  const status = exception.getStatus();

	  response.status(status).json({
		  statusCode: status,
		  timestamp: new Date().toISOString(),
		  path: request.url,
		  // @ts-ignore
		  ...exception.getResponse(),
	  });

  }
}
