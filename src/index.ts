import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import {User} from "./entities/User";
import {Post} from "./entities/Post";
import {Comment} from "./entities/Comment";

function addUser(firstName, lastName, email){
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    return user;
}

function addPost(author, title, body){
    const post = new Post();
    post.author = author;
    post.title = title;
    post.body = body;
    return post;
}

function addComment(author, post, commentText){
    const comment = new Comment();
    comment.author = author;
    comment.post = post;
    comment.comment = commentText;
    return comment;
}

const run = async () => {
    await createConnection();
    
    // Add users
    const user1 = addUser("Lev", "Tolstoy", "tolstoy@gmail.com");
    await user1.save();
    const user2 = addUser("Aleksandr", "Pushcin", "pushcin@yandex.ru");
    await user2.save();
    
    // Add posts
    const post1 = addPost(user1, "war and peace", "long story");
    await post1.save();
    const post2 = addPost(user2, "winter evening", "winter morning");
    await post2.save();

    // Add comments
    const comment1 = addComment(user2, post1, "This poem is beautiful!");
    await comment1.save();
    const comment2 = addComment(user1, post2, "War and peace is long.");
    await comment2.save();
    
    // Output posts
    console.log("All posts: ", await Post.find({
        relations: ['author']
    }));
    
    // Output posts by user
    console.log("posts by pushcin: ", await Post.find({
         where: {author: user2},
         relations: ['author']
    }));
    
    // Output posts with comments
    console.log("posts and comments: ", await Post.find({
        relations: ['comments']
    }));
    
    // Update post
    const postForUpdate = await Post.findOne({where: {id: post1.id}});
    postForUpdate.body = "winter evening";
    await postForUpdate.save();
    
    // Delete comment
    await Comment.getRepository().delete(comment2.id);
    
}

run().catch(console.log)
