import "reflect-metadata";
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import express, { Router } from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3000
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = Router()

router
  .get('/posts', async (_req, res) => {
    const posts = await Post.find()
    res.render('index', { posts })
  })
  .get('/posts/new', (_req, res) => {
    res.render('new')
  })
  .post('/posts', async (req, res) => {
    const post = await (Post.create(req.body) as unknown as Post).save()
    res.redirect(`/posts/${post.id}`)
  })
  .get('/posts/:id/edit', async (req, res) => {
    const post = await Post.findOne(req.params.id)
    res.render('edit', { post })
  })
  .get('/posts/:id', async (req, res) => {
    const post = await Post.findOne(req.params.id)
    res.render('show', { post })
  })
  .delete('/posts/:id', async (req, res) => {
    await Post.delete(req.params.id)
    res.redirect(`/posts`)
  })
  .post('/posts/:id', async (req, res) => {
    const post = await Post.findOne(req.params.id)
    post.title = req.body.title
    post.body = req.body.body
    await post.save()
    res.redirect(`/posts/${post.id}`)
  });

app.set('view engine', 'ejs')
app.use(jsonParser)
app.use(urlencodedParser)
app.use(router)

createConnection().then(() => {
  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
})

