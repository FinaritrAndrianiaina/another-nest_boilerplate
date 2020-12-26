import { HttpException, ValidationError } from '@nestjs/common';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
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
    
    if(status==400){
      response.status(status).json(exception.getResponse());
      return
    }
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message
    });
    
  }
}
