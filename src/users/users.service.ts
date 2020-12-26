import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepos: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const new_user = this.userRepos.create(createUserDto);
    return this.userRepos.save(new_user);
  }

  async findAll() {
    return await this.userRepos.find();
  }

  findOne(id: string) {
    return this.userRepos.findOneOrFail({ where: { id } });
  }

  async login(loginDto:LoginDto) {
    try {
      const user = await this.userRepos.findOneOrFail({where:loginDto})
      return user;
    } catch (error) {
      if (error instanceof EntityNotFoundError){
        throw new UnauthorizedException({message:"Les informations fournies sont erronées"})
      }
      throw error
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const updated_user = await this.userRepos.update(user, updateUserDto);
    return {
      generatedMaps: updated_user.generatedMaps,
      ...user,
      ...updateUserDto,
      ...updated_user.raw,
    };
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
