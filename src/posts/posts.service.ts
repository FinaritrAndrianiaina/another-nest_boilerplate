import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
	constructor(@InjectRepository(Post) private readonly postRepositoy: Repository<Post>) {}

	create(createPostDto: CreatePostDto, author: User) {
		const newPost = this.postRepositoy.create(createPostDto);
		newPost.author = author;
		return this.postRepositoy.save(newPost);
	}

	findAll() {
		return this.postRepositoy.find({ loadRelationIds: true });
	}

	checkIfOwnerOrAdmin(post: Post, user: User): boolean {
		if (post.author.id === user.id || user.isAdmin) return true;
		throw new UnauthorizedException('You must be admin or owner to modify this post');
	}

	findOne(id: string) {
		return this.postRepositoy.findOneOrFail({ where: { id }, relations: ['author'] });
	}

	async update(id: string, updatePostDto: UpdatePostDto, user: User) {
		const oldPost = await this.findOne(id);
		this.checkIfOwnerOrAdmin(oldPost, user);
		Object.assign(oldPost, updatePostDto);
		return this.postRepositoy.save(oldPost);
	}

	async remove(id: string, user: User) {
		const oldPost = await this.findOne(id);
		this.checkIfOwnerOrAdmin(oldPost, user);
		return this.postRepositoy.remove(oldPost);
	}
}
