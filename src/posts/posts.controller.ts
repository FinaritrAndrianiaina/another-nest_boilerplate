import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous, JwtGuard } from 'src/auth/jwt/jwt.guard';

@Controller('posts')
@ApiTags('Posts')
@UseGuards(JwtGuard)
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Post('create')
	@ApiBearerAuth()
	create(@Body() createPostDto: CreatePostDto, @Req() req) {
		return this.postsService.create(createPostDto, req.user);
	}

	@Get()
	@AllowAnonymous()
	findAll() {
		return this.postsService.findAll();
	}

	@Get('/myPost')
	@ApiBearerAuth()
	getMyPost(@Req() req) {
		return this.postsService.getMyPost(req.user);
	}

	@Get(':id')
	@AllowAnonymous()
	findOne(@Param('id') id: string) {
		return this.postsService.findOne(id);
	}

	@Put(':id')
	@ApiBearerAuth()
	update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() res) {
		return this.postsService.update(id, updatePostDto, res.user);
	}

	@Delete(':id')
	@ApiBearerAuth()
	remove(@Param('id') id: string, @Req() res) {
		return this.postsService.remove(id, res);
	}
}
