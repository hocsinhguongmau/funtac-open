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
			{blog.title} {blog.author}
			<button onClick={() => setVisible(!visible)}>
				{visible ? 'hide' : 'view'}
			</button>
			<br />
			<div
				className='hidden-content'
				style={{ display: visible ? 'block' : 'none' }}>
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
	handleDelete: PropTypes.func,
	handleLike: PropTypes.func,
	blog: PropTypes.object.isRequired,
}
