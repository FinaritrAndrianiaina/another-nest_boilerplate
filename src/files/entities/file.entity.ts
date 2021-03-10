import { Post } from "src/posts/entities/post.entity";
import User from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("files")
export class File {
    @PrimaryColumn()
    filename: string

    @Column({type:"varchar"})
    extension: string

    @Column({type:"varchar"})
    title: string

    @Column({type:"varchar",nullable:true})
    description: string

    @ManyToOne(type=>User,user=>user.files)
    uploadedby: User

    @ManyToOne(type=>Post,post=>post.documents,{nullable:true,onUpdate:"CASCADE",onDelete:"CASCADE"})
    associatedPost: Post

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}
 