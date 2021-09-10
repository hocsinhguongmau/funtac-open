const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.get('/info', (request, response) => {
  const time = new Date()
  Blog.find({}).then((blogs) => {
    const length = blogs.length
    blogs.map((blog) => blog.toJSON())
    response.send(
      `<div><p>Blog list has info for ${length} blogs</p><p>${time}</p>`
    )
  })
})

blogRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id

  const blog = await Blog.findById(id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogRouter.post('/', async (request, response) => {
  const { body } = request
  if (!body.title) {
    return response.status(400).json({
      error: 'Title is required',
    })
  }
  if (!body.author) {
    return response.status(400).json({
      error: 'Author is required',
    })
  }
  if (!body.url) {
    return response.status(400).json({
      error: 'Link is required',
    })
  }
  if (!body.likes) {
    body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  const savedBlog = await blog.save()
  response.json(savedBlog)
})

module.exports = blogRouter
