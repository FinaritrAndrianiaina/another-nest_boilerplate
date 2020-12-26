import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpFilter } from './filters/http.filter';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpFilter,
    },
  ],
})
export class AppModule {}
