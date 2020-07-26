import "reflect-metadata";
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import express, { Router } from 'express'
import bodyParser, { json } from 'body-parser'

const app = express()
const port = 3000
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = Router()

router
  .get('/posts', async (_req, res) => {
    res.json(await Post.find());
  })
  .post('/posts', async (req, res) => {
    res.json(await (Post.create(req.body) as unknown as Post).save());
  })
  .get('/posts/:id', async (req, res) => {
    res.json(await Post.findOne(req.params.id))
  })
  .delete('/posts/:id', async (req, res) => {
    await Post.delete(req.params.id)
    res.status(200)
  })
  .patch('/posts/:id', async (req, res) => {
    const post = await Post.findOne(req.params.id)
    post.title = req.body.title
    post.body = req.body.body
    res.json(await post.save())
  });

app.use(jsonParser)
app.use(urlencodedParser)
app.use(router)

createConnection().then(() => {
  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
})

