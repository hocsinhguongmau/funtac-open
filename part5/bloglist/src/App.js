import React, { useState, useEffect } from 'react'
import Blogs from './Blog'
import Form from './Form'
import Filter from './Filter'
import Notification from './Notification'
import blogsService from './service/blogs'
import loginService from './service/login'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [results, setResults] = useState([])
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')
	const [newLikes, setNewLikes] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)
	const [error, setError] = useState(false)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogsService.getAll().then((initialBlogs) => {
			setBlogs(initialBlogs)
			setResults(initialBlogs)
		})
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username,
				password,
			})
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}

		console.log('logging in with', username, password)
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		if (results.find((blog) => blog.title === newTitle)) {
			if (
				window.confirm(
					`${newTitle} is already added to blog list. Do you want to change url and author`,
				)
			) {
				results.forEach((blog, index) => {
					if (blog.title === newTitle) {
						const modifiedResults = [...results]
						modifiedResults[index].author = newAuthor
						modifiedResults[index].url = newUrl
						modifiedResults[index].likes = newLikes

						blogsService
							.update(blog.id, modifiedResults)
							.then(setResults(modifiedResults))
							.catch(() => {
								setErrorMessage('This blog does not exist')
								setError(true)
								blogsService.getAll().then((initialBlogs) => {
									setBlogs(initialBlogs)
									setResults(initialBlogs)
								})
							})
					}
				})
			}
		} else {
			const newBlogs = {
				title: newTitle,
				author: newAuthor,
				url: newUrl,
				likes: newLikes,
			}
			blogsService
				.create(newBlogs)
				.then((updatedBlogs) => {
					setBlogs(blogs.concat(updatedBlogs))
					setResults(results.concat(updatedBlogs))
					setErrorMessage('Successful')
				})
				.catch((error) => {
					setErrorMessage(error.response.data)
					console.log(error.response.data)
				})
		}
		setTimeout(() => {
			setErrorMessage(null)
			setError(false)
		}, 5000)
	}

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

	const handleFilter = (event) => {
		const searchString = event.target.value.toLowerCase().split(' ')
		const filterBlogs = blogs.filter((blog) => {
			let containsAtLeastOneWord = false
			searchString.forEach((word) => {
				if (blog.title.toLowerCase().includes(word))
					containsAtLeastOneWord = true
			})
			if (containsAtLeastOneWord) {
				return blog
			} else {
				return null
			}
		})
		setResults(filterBlogs)
	}

	const handleDelete = (id) => {
		if (window.confirm('Do you want to delete this blog?')) {
			const updatedBlogs = results.filter((result) => result.id !== id)
			setBlogs(updatedBlogs)
			setResults(updatedBlogs)
			blogsService.remove(id)
		}
	}
	return (
		<div>
			<h2>Blog list</h2>
			{errorMessage ? (
				<Notification message={errorMessage} error={error} />
			) : null}
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
			<Filter handleFilter={handleFilter} />
			<Form
				handleChangeTitle={handleChangeTitle}
				handleSubmit={handleSubmit}
				handleChangeAuthor={handleChangeAuthor}
				handleChangeUrl={handleChangeUrl}
				handleChangeLike={handleChangeLike}
			/>
			<Blogs results={results} handleDelete={handleDelete} />
		</div>
	)
}

export default App
