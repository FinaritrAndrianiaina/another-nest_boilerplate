import User from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("files")
export class File {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({type:"varchar"})
    originalfilename: string

    @Column({type:"varchar"})
    extension: string

    @Column({type:"varchar"})
    title: string

    @Column({type:"varchar",nullable:true})
    description: string

    @ManyToOne(type=>User,user=>user.files)
    uploadedby: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}
 