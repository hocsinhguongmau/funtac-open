import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { initBlogs, addLikes, delBlog } from '../reducers/blogReducer'

const BlogList = (props) => {
  const sortingBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }
  useEffect(() => {
    props.initBlogs(props.blogs)
  }, [])
  return (
    <div>
      {sortingBlogs(props.blogs).map((blog) => (
        <BlogItem
          key={blog.id}
          blog={blog}
          addLikes={props.addLikes}
          delBlog={props.delBlog}
        />
      ))}
    </div>
  )
}
const BlogItem = (props) => {
  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginTop: 15,
  }
  const [visible, setVisible] = useState(false)
  const handleLike = (blog) => {
    props.addLikes(blog)
  }
  const handleDelete = (id) => {
    props.delBlog(id)
  }
  return (
    <div style={blogStyle} className='blog-item'>
      <span className='blog-title'>{props.blog.title}</span>{' '}
      <span className='blog-author'>{props.blog.author}</span>
      <button onClick={() => setVisible(!visible)} className='button-view'>
        {visible ? 'hide' : 'view'}
      </button>
      <br />
      <div
        className='hidden-content'
        style={{ display: visible ? 'block' : 'none' }}>
        <span className='blog-url'>{props.blog.url}</span>
        <br />
        <span className='blog-likes'>{props.blog.likes}</span>
        <button onClick={() => handleLike(props.blog)} className='button-like'>
          like
        </button>
        <br />
        <button
          onClick={() => handleDelete(props.blog.id)}
          className='button-delete'>
          Delete
        </button>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  if (state.filter === '') {
    return {
      blogs: state.blogs,
    }
  }

  const regex = new RegExp(state.filter, 'i')
  return {
    blogs: state.blogs.filter((blog) => blog.title.match(regex)),
  }
}
const mapDispatchToProps = {
  initBlogs,
  addLikes,
  delBlog,
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)
