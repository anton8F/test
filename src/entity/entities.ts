import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class user {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

}

@Entity()
export class post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    creator: number;

    @Column()
    title: string;

    @Column()
    article: string;

}

@Entity()
export class comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    creator: number;

    @Column()
    comment: string;

    @Column()
    post: number;

}

