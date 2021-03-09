import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';

@Module({
	imports: [
		TypeOrmModule.forFeature([File]),
		MulterModule.register({
			storage: diskStorage({
				destination: './uploads',
				filename: (req, file, cb) => {
					const uuid = v4();
					cb(null, `${uuid}.${file.originalname}`);
				},
			}),
		}),
	],
	controllers: [FilesController],
	providers: [FilesService],
})
export class FilesModule {}
