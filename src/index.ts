import "reflect-metadata";
import {createConnection} from "typeorm";
import {User, Post, Comment} from "./entity/entities";

const run = async () => {
    await createConnection();

    const user1 = new User();
    user1.firstName = "Lev";
    user1.lastName = "Tolstoy";
    user1.email = "tolstoy@gmail.com";
    await user1.save();

    const user2 = new User();
    user2.firstName = "Aleksandr";
    user2.lastName = "Pushcin";
    user2.email = "pushcin@yandex.ru";
    await user2.save();

    const post1 = new Post();
    post1.author = user2;
    post1.title = "winter evening";
    post1.body = "winter morning";
    await post1.save();
    
    const post2 = new Post();
    post2.author = user1;
    post2.title = "war and peace";
    post2.body = "long story";
    await post2.save();

    const comment1 = new Comment();
    comment1.creator = 1;
    comment1.post = 2;
    comment1.comment = "This poem is beautiful!";
    await comment1.save();
    
    const comment2 = new Comment();
    comment2.creator = 2;
    comment2.post = 1;
    comment2.comment = "War and peace is long.";
    await comment2.save();
    
    console.log("Loading posts from the database...");
    const posts = await Post.find({
        relations: ['author']
    });
    console.log("Loaded posts: ", posts);
    
    console.log("Here you can setup and run express/koa/any other framework.");
}

run().catch(console.log)
