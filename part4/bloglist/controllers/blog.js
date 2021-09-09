const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
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

blogRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Blog.findById(id)
    .then((blog) => {
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

blogRouter.put('/:id', (request, response, next) => {
  const id = request.params.id
  Blog.findById(id)
    .then((blog) => {
      if (blog) {
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

blogRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  Blog.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
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
    return response.status(400).json({
      error: 'Like is required',
    })
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
