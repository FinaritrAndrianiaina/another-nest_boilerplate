import User from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;

	@Column({ type: 'text' })
    description: string;
    

    @ManyToOne(type=>User,user=>user.posts)
	author: User
	

	@Column({type:"double precision"})
	goal: number

	@Column({type:"double precision",default:0})
	actual: number

	@CreateDateColumn()
	createdDate: Date

	@UpdateDateColumn()
	updatedDate: Date
}
