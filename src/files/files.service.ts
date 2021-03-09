import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {
	constructor(@InjectRepository(File) private readonly filesRepos: Repository<File>) {}

	create(file, user: User) {
		const newFile = this.filesRepos.create();
		newFile.originalfilename = newFile.title = file.filename;
		newFile.extension = file.mimetype;
		newFile.uploadedby = user;
		return this.filesRepos.save(newFile);
	}

	
	getFileList(user:User){
		return this.filesRepos.find({where:{uploadedby:user}})
	}

	findOne(id: number) {
		return this.filesRepos.findOneOrFail({ where: { id }, relations: ['uploadedby'] });
	}

	checkIfOwnerOrAdmin(post: File, user: User): boolean {
		console.log('post', post)
		if (post.uploadedby.id === user.id || user.isAdmin) return true;
		throw new UnauthorizedException('You must be admin or owner to modify this post');
	}

	async update(id: number, updatePostDto: UpdateFileDto, user: User) {
		const oldPost = await this.findOne(id);
		this.checkIfOwnerOrAdmin(oldPost, user);
		Object.assign(oldPost, updatePostDto);
		return this.filesRepos.save(oldPost);
	}

	remove(id: number) {
		return `This action removes a #${id} file`;
	}
}
