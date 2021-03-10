import {
	Controller,
	Post,
	UseInterceptors,
	UploadedFile,
	Res,
	Get,
	Param,
	Logger,
	UseGuards,
	Req,
	Put,
	Body,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AllowAnonymous, JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/users/role.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UpdateFileDto } from './dto/update-file.dto';

@Controller('files')
@UseGuards(JwtGuard)
@ApiTags("Files")
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Get('/myfile')
	@ApiBearerAuth()
	getAllMyfile(@Req() req) {
		return this.filesService.getFileList(req.user);
	}

	@Put('addDocToPost/:filename/:postid')
	@ApiBearerAuth()
	addingFileToPost(@Param('filename') filename:string, @Param('postid') postid:string,@Req() req) {
		return this.filesService.associateFileWithPost(filename, postid,req.user);
	}

	@Post()
	@ApiBearerAuth()
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(@UploadedFile() file, @Req() req) {
		return this.filesService.create(file, req.user);
	}

	@Put('/update/:filename')
	@ApiBearerAuth()
	updateFile(@Param('id') filename: string, @Body() fileUpdateDto: UpdateFileDto, @Req() req) {
		return this.filesService.update(filename, fileUpdateDto, req.user);
	}
}
