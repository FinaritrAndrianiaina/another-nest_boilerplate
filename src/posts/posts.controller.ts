import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous, JwtGuard } from 'src/auth/jwt/jwt.guard';
import { OwnerOrAdmin, RolesGuard } from 'src/users/role.guard';

@Controller('posts')
@ApiTags('Posts')
@UseGuards(JwtGuard)
@UseGuards(RolesGuard)
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

	@Get(':id')
	@ApiBearerAuth()
	findOne(@Param('id') id: string) {
		return this.postsService.findOne(id);
	}

	@Put(':id')
	@ApiBearerAuth()
	@OwnerOrAdmin()
	update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
		return this.postsService.update(id, updatePostDto);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@OwnerOrAdmin()
	remove(@Param('id') id: string) {
		return this.postsService.remove(id);
	}
}
