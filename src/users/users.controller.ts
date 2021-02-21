import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import User from './entities/user.entity';
import { JwtGuard,AllowAnonymous } from 'src/auth/jwt/jwt.guard';
import {  OwnerOrAdmin, Roles, RolesGuard } from './role.guard';
import { ADMIN } from './entities/user.role';



@Controller('users')
@ApiTags('Users')
@UseGuards(RolesGuard)
@UseGuards(JwtGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post('create')
	@ApiBearerAuth()
	@Roles(ADMIN)
	create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.usersService.create(createUserDto);
	}
	
	@Get()
	@ApiBearerAuth()
	@Roles(ADMIN)
	async findAll(@Request() req) {
		return await this.usersService.findAll();
	}
	
	@Get(':id')
	@AllowAnonymous()
	async findOne(@Param('id', ParseUUIDPipe) id: string) {
		return await this.usersService.findOne(id);
	}
	
	@Put(':id')
	@ApiBearerAuth()
	@OwnerOrAdmin()
	update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}
	
	@Delete(':id')
	@ApiBearerAuth()
	@OwnerOrAdmin()
	remove(@Param('id', ParseUUIDPipe) id: string) {
		return this.usersService.remove(id);
	}
}
