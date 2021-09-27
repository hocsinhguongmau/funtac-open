import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = (props) => {
  const sortingBlogs = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  return (
    <ul>
      {sortingBlogs(props.blogs).map((blog) => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
    </ul>
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

export default connect(mapStateToProps)(BlogList)
