import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany} from "typeorm";

import {User} from "./User";
import {Comment} from "./Comment";

@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.posts)
    author: User;

    @Column()
    title: string;

    @Column()
    body: string;

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];
}
