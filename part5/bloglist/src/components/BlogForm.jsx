import React, { useState } from 'react'

export default function BlogForm({ handleBlog }) {
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')
	const [newLikes, setNewLikes] = useState('')
	const handleChangeTitle = (event) => {
		setNewTitle(event.target.value)
	}

	const handleChangeAuthor = (event) => {
		setNewAuthor(event.target.value)
	}
	const handleChangeUrl = (event) => {
		setNewUrl(event.target.value)
	}
	const handleChangeLike = (event) => {
		setNewLikes(event.target.value)
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		const newBlogs = {
			title: newTitle,
			author: newAuthor,
			url: newUrl,
			likes: newLikes,
		}
		handleBlog(newBlogs)
	}

	// const handleSubmit = (event) => {
	// 	event.preventDefault()

	// 	if (results.find((blog) => blog.title === newTitle)) {
	// 		if (
	// 			window.confirm(
	// 				`${newTitle} is already added to blog list. Do you want to change url and author`,
	// 			)
	// 		) {
	// 			results.forEach((blog, index) => {
	// 				if (blog.title === newTitle) {
	// 					const modifiedResults = [...results]
	// 					modifiedResults[index].author = newAuthor
	// 					modifiedResults[index].url = newUrl
	// 					modifiedResults[index].likes = newLikes

	// 					blogsService
	// 						.update(blog.id, modifiedResults)
	// 						.then(setResults(modifiedResults))
	// 						.catch(() => {
	// 							setErrorMessage('This blog does not exist')
	// 							setError(true)
	// 							blogsService.getAll().then((initialBlogs) => {
	// 								setBlogs(initialBlogs)
	// 								setResults(initialBlogs)
	// 							})
	// 						})
	// 				}
	// 			})
	// 		}
	// 	} else {
	// 		const newBlogs = {
	// 			title: newTitle,
	// 			author: newAuthor,
	// 			url: newUrl,
	// 			likes: newLikes,
	// 		}
	// 		blogsService
	// 			.create(newBlogs)
	// 			.then((updatedBlogs) => {
	// 				setBlogs(blogs.concat(updatedBlogs))
	// 				setResults(results.concat(updatedBlogs))
	// 				setErrorMessage('Successful')
	// 			})
	// 			.catch((error) => {
	// 				setErrorMessage(error.response.data.error)
	// 				console.log(error.response.data.error)
	// 				setError(true)
	// 			})
	// 	}
	// 	setTimeout(() => {
	// 		setErrorMessage(null)
	// 		setError(false)
	// 	}, 5000)
	// }

	return (
		<form onSubmit={handleSubmit}>
			<h2>Add a new blog</h2>
			<div>
				Title: <input onChange={handleChangeTitle} />
			</div>
			<div>
				Author: <input onChange={handleChangeAuthor} />
			</div>
			<div>
				Link: <input onChange={handleChangeUrl} />
			</div>
			<div>
				Likes: <input onChange={handleChangeLike} />
			</div>
			<div>
				<button type='submit'>Add</button>
			</div>
		</form>
	)
}
