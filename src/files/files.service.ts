import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsService } from 'src/posts/posts.service';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {
	constructor(
		@InjectRepository(File) private readonly filesRepos: Repository<File>,
		private readonly postService: PostsService,
	) {}

	create(file, user: User) {
		const newFile = this.filesRepos.create();
		newFile.filename = newFile.title = file.filename;
		newFile.extension = file.mimetype;
		newFile.uploadedby = user;
		return this.filesRepos.save(newFile);
	}
	
	async associateFileWithPost(filename: string, postid: string, user: User) {
		const post = await this.postService.findOne(postid);
		await this.postService.checkIfOwnerOrAdmin(post, user);
		const file = await this.findOne(filename);
		await this.checkIfOwnerOrAdmin(file, user);
		file.associatedPost = post;
		return this.filesRepos.save(file);
	}

	getFileList(user: User) {
		return this.filesRepos.find({ where: { uploadedby: user },loadRelationIds:true });
	}

	findOne(filename: string) {
		return this.filesRepos.findOneOrFail({ where: { filename }, relations: ['uploadedby'] });
	}

	checkIfOwnerOrAdmin(file: File, user: User): boolean {
		if (file.uploadedby.id === user.id || user.isAdmin) return true;
		throw new UnauthorizedException('You must be admin or owner to modify this file');
	}

	async update(filename: string, updatePostDto: UpdateFileDto, user: User) {
		const oldPost = await this.findOne(filename);
		this.checkIfOwnerOrAdmin(oldPost, user);
		Object.assign(oldPost, updatePostDto);
		return this.filesRepos.save(oldPost);
	}

	remove(id: number) {
		return `This action removes a #${id} file`;
	}
}
