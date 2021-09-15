import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function BlogItem({ blog, handleDelete, handleLike }) {
	const [visible, setVisible] = useState(false)
	const blogStyle = {
		padding: 10,
		border: 'solid',
		borderWidth: 1,
		marginTop: 15,
	}

	return (
		<div style={blogStyle}>
			{blog.title}{' '}
			<button onClick={() => setVisible(!visible)}>
				{visible ? 'hide' : 'view'}
			</button>
			<br />
			<div style={{ display: visible ? 'block' : 'none' }}>
				{blog.author} <br />
				{blog.url}
				<br />
				{blog.likes} <button onClick={() => handleLike(blog)}>like</button>
				<br />
				<button onClick={() => handleDelete(blog.id)}>Delete</button>
			</div>
		</div>
	)
}
BlogItem.propTypes = {
	handleDelete: PropTypes.func.isRequired,
	handleLike: PropTypes.func.isRequired,
	blog: PropTypes.array.isRequired,
}
