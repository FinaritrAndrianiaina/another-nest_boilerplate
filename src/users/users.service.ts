import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from '../auth/dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';
import { DuplicatefieldException } from 'src/filters/exceptions/duplicatefield.exception';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepos: Repository<User>,
	) {}

	duplicateError(message: string) {
		throw new DuplicatefieldException({message})
	}

	async checkIfDoesntExists(dto: Partial<User>){
		const username_ = await this.userRepos.findOne({ where: { username: dto.username } });
		const email_ = await this.userRepos.findOne({ where: { email: dto.email } });
		
		Boolean(username_) && this.duplicateError(`Le nom d'utilisateur ${dto.username} est déjà utilisé`); 
		Boolean(email_) && this.duplicateError(`L'email ${dto.email} est déjà utilisée`);
		return true; 
	}

	async create(createUserDto: CreateUserDto): Promise<User> {
		await this.checkIfDoesntExists(createUserDto);
		const new_user = this.userRepos.create(createUserDto);
		return this.userRepos.save(new_user);
	} 

	async findAll() {
		return await this.userRepos.find();
	}

	findOne(id: string) {
		return this.userRepos.findOneOrFail({ where: { id } ,loadRelationIds:true});
	}

	
	loadPosts(id:string){
		return this.userRepos.findOneOrFail({where:{id},loadEagerRelations:true})
	}

	unauhtorized() {
		throw new UnauthorizedException({
			message: 'Les informations fournies sont erronées',
		});
	}

	async login(loginDto: LoginDto) {
		loginDto.checkDto();
		try {
			return await this.userRepos.findOneOrFail({ where: loginDto });
		} catch (error) {
			if (error instanceof EntityNotFoundError) {
				this.unauhtorized();
			}
			throw error;
		}
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const user = await this.findOne(id);
		return this.userRepos.save({ ...user, ...updateUserDto });
	}

	async remove(id: string) {
		const user = await this.findOne(id);
		return await this.userRepos.remove(user)
	}
}
