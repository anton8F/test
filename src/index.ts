import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import {User} from "./entities/User";
import {Post} from "./entities/Post";
import {Comment} from "./entities/Comment";

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

async function connect(){
    await createConnection();
}

connect();

app.route('/posts')
  .get(async function(req, res) {
    res.json(await User.findOne());
  })
  .post(urlencodedParser, async function(req, res) {
    res.json(req.body);
  });

app.route('/posts/:id')
  .get(function(req, res) {
    res.send('Hello!');
  })
  .post(function(req, res) {
    res.send('Bye!');
  })
  .put(function(req, res) {
    res.send('Bye?');
  });


  
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
 
