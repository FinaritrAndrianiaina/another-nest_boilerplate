import { Controller, Post, UseInterceptors, UploadedFile, Res, Get, Param, Logger, UseGuards, Req, Put, Body } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AllowAnonymous, JwtGuard } from 'src/auth/jwt/jwt.guard';
import {  RolesGuard } from 'src/users/role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateFileDto } from './dto/update-file.dto';

@Controller('files')
@UseGuards(JwtGuard)
export class FilesController {
	private readonly logger: Logger = new Logger();
	constructor(private readonly filesService: FilesService) {}

	@Get('/myfile')
	@ApiBearerAuth()
	getAllMyfile(@Req() req){
		return this.filesService.getFileList(req.user);
	}

	@Post()
	@ApiBearerAuth()
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(@UploadedFile() file,@Req() req) {
		this.logger.log(file);
		return this.filesService.create(file,req.user);
	}

	@Get(':filepath')
	@AllowAnonymous()
	getFile(@Param('filepath') file, @Res() res) {
		return res.sendFile(file, { root: './uploads' });
	}
	
	@Put('/update/:id')
	@ApiBearerAuth()
	updateFile(@Param('id') id:string,@Body() fileUpdateDto: UpdateFileDto,@Req() req){
		console.log('id', +id)
		return this.filesService.update(+id,fileUpdateDto,req.user)	
	}

	
}
