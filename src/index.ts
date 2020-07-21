import "reflect-metadata";
import {createConnection} from "typeorm";
import {user, post, comment} from "./entity/entities";

const run = async () => {
    const conn = await createConnection();

    const user1 = new user();
    user1.firstName = "Lev";
    user1.lastName = "Tolstoy";
    user1.email = "tolstoy@gmail.com";
    await conn.manager.save(user1);

    const user2 = new user();
    user2.firstName = "Aleksandr";
    user2.lastName = "Pushcin";
    user2.email = "pushcin@yandex.ru";
    await conn.manager.save(user2);

    const post1 = new post();
    post1.creator = 2;
    post1.title = "winter evening";
    post1.article = "winter morning";
    await conn.manager.save(post1);
    
    const post2 = new post();
    post2.creator = 1;
    post2.title = "war and peace";
    post2.article = "long story";
    await conn.manager.save(post2);

    const comment1 = new comment();
    comment1.creator = 1;
    comment1.post = 2;
    comment1.comment = "This poem is beautiful!";
    await conn.manager.save(comment1);
    
    const comment2 = new comment();
    comment2.creator = 2;
    comment2.post = 1;
    comment2.comment = "War and peace is long.";
    await conn.manager.save(comment2);
    
    console.log("Loading posts from the database...");
    const posts = await conn.manager.find(post);
    console.log("Loaded posts: ", posts);
    
    console.log("Here you can setup and run express/koa/any other framework.");
}

run().catch(console.log)
