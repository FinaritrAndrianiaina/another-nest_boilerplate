import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/exception.filter';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpFilter } from './filters/http.filter';
import { UsersModule } from './users/users.module';
import { EntitynotfoundFilter } from './filters/entitynotfound.filter';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
	imports: [
		UsersModule,
		TypeOrmModule.forRoot(),
		AuthModule,
		PostsModule,
		FilesModule,
	],
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
