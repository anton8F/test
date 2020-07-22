import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany} from "typeorm";
import {Post} from "Post";
import {Comment} from "Comment";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @OneToMany(type => Post, post => post.author)
    posts: Post[];
    
    @OneToMany(type => Comment, comment => comment.author)
    comments: Comment[]

}
