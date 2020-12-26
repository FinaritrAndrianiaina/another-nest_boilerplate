import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/exception.filter';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpFilter } from './filters/http.filter';
import { UsersModule } from './users/users.module';
import { EntitynotfoundFilter } from './filters/entitynotfound.filter';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [ 
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: EntitynotfoundFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpFilter,
    },
    AppService,
  ],
})
export class AppModule {}
