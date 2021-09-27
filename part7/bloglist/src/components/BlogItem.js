import React, { useState } from 'react'
import { addLikes, delBlog, comment } from '../reducers/blogReducer'
import { useRouteMatch, useHistory } from 'react-router'
import { connect } from 'react-redux'

const BlogItem = (props) => {
  const match = useRouteMatch('/blogs/:id')
  const blog = props.blogs.find((blog) => blog.id === match.params.id)

  const history = useHistory()
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginTop: 15,
  }
  const handleLike = (blog) => {
    props.addLikes(blog)
  }
  const handleDelete = (id) => {
    props.delBlog(id)
    history.push('/')
  }
  const handleComment = (e) => {
    setComment(e.target.value)
  }
  const handlePostComment = (e) => {
    e.preventDefault()
    props.comment(blog, comment)
    setComment('')
  }
  const [comment, setComment] = useState('')
  return blog !== undefined ? (
    <div style={blogStyle} className='blog-item'>
      <span className='blog-title'>{blog.title}</span>{' '}
      <span className='blog-author'>{blog.author}</span>
      <br />
      <span className='blog-url'>{blog.url}</span>
      <br />
      <span className='blog-likes'>{blog.likes}</span>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => handleLike(blog)}>
        like
      </button>
      <br />
      <button
        onClick={() => handleDelete(blog.id)}
        className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Delete
      </button>
      <br />
      added by {blog.user.username}
      <h3>comments</h3>
      <form onSubmit={handlePostComment}>
        <input
          className='border-2 border-gray-500'
          type='text'
          onChange={handleComment}
          value={comment}
          required
        />
        <button
          className='bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          type='submit'>
          comment
        </button>
      </form>
      {blog.comments ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={`comment_${index}`}>{comment}</li>
          ))}
        </ul>
      ) : null}
    </div>
  ) : (
    <p>No blog found</p>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const mapDispatchToProps = {
  addLikes,
  delBlog,
  comment,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogItem)
