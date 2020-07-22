import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany} from "typeorm";

import {Post} from "./Post";
import {User} from "./User";

@Entity()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.comments)
    author: User;

    @Column()
    comment: string;

    @ManyToOne(type => Post, post => post.comments)
    post: Post;

} 

