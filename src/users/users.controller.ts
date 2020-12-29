import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import User from './entities/user.entity';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RoleGuard } from '../auth/jwt/role.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {
	}

	@Post('create')
	create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.usersService.create(createUserDto);
	}

	@Get()
	@ApiBearerAuth()
	@UseGuards(JwtGuard)
	@UseGuards(RoleGuard)
	async findAll() {
		
		return await this.usersService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id', ParseUUIDPipe) id: string) {
		return await this.usersService.findOne(id);
	}

	@Put(':id')
	update(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseUUIDPipe) id: string) {
		return this.usersService.remove(id);
	}
}
