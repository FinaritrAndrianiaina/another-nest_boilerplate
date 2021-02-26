import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
	constructor(@InjectRepository(Post) private readonly postRepositoy: Repository<Post>) {}

	create(createPostDto: CreatePostDto,author:User) {
    const newPost = this.postRepositoy.create(createPostDto);
    newPost.author = author;
		return this.postRepositoy.save(newPost);
	}

	findAll() {
		return this.postRepositoy.find({relations:["author"]});
	}

	findOne(id: string) {
		return this.postRepositoy.findOneOrFail({ where: { id } });
	}

	async update(id: string, updatePostDto: UpdatePostDto) {
    const oldPost = await this.findOne(id)
    Object.assign(oldPost,updatePostDto)
    return this.postRepositoy.save(oldPost);
	}

	async remove(id: string) {
    const oldPost = await this.findOne(id);
		return this.postRepositoy.remove(oldPost);
	}
}
