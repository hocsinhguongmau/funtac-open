const blogRouter = require('express').Router()
const Blog = require('../models/blog')

const userContent = {
	username: 1,
	name: 1,
}
blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', userContent)
	response.json(blogs)
})

blogRouter.get('/info', (request, response) => {
	const time = new Date()
	Blog.find({}).then((blogs) => {
		const length = blogs.length
		blogs.map((blog) => blog.toJSON())
		response.send(
			`<div><p>Blog list has info for ${length} blogs</p><p>${time}</p>`,
		)
	})
})

blogRouter.get('/:id', async (request, response) => {
	const id = request.params.id
	const blog = await Blog.findById(id).populate('user', userContent)
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
	// await Blog.findByIdAndRemove(id)
	// response.status(204).end()
	// get user from request object
	const user = request.user
	const token = request.token
	// const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!token || !user.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	// const userId = await User.findById(decodedToken.id)
	const blog = await Blog.findById(id)
	if (blog.user.toString() === user.id.toString()) {
		await blog.remove()
		response.status(204).end()
	} else {
		response.status(401).end()
	}
})

blogRouter.post('/', async (request, response) => {
	const { body } = request
	const token = request.token
	const user = request.user

	// const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!token || !user.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

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
	// get user from request object
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id,
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	response.status(201).json(savedBlog)
})

module.exports = blogRouter
