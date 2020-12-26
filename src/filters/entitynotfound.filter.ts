import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import {EntityNotFoundError} from "typeorm/error/EntityNotFoundError"

@Catch(EntityNotFoundError)
export class EntitynotfoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();


    response.status(404).json({
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
