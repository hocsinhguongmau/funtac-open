import * as blogServices from '../service/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOG':
      return action.data
    case 'ADD_BLOG':
      return state
    case 'DEL_BLOG': {
      const modifiedBlog = state.filter((blog) => blog.id !== action.data)
      return modifiedBlog
    }
    case 'ADD_LIKES': {
      const modifiedState = [...state]
      modifiedState.find((blog) => blog.id === action.data.id).likes++
      return modifiedState
    }
    case 'COMMENT': {
      const id = action.data.id
      const updatedBlog = state.find((blog) => blog.id === id)
      const changedBlog = {
        ...updatedBlog,
        comments: action.data.comments,
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    }
    default:
      return state
  }
}
export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll()
    dispatch({
      type: 'INIT_BLOG',
      data: blogs,
    })
  }
}

export const addLikes = (blog) => {
  return async (dispatch) => {
    await blogServices.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch({ type: 'ADD_LIKES', data: blog })
  }
}

export const delBlog = (id) => {
  return (dispatch) => {
    blogServices.remove(id)
    dispatch({ type: 'DEL_BLOG', data: id })
  }
}

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    await blogServices.create(newBlog)
    dispatch({ type: 'ADD_BLOG' })
  }
}
export const comment = (blog, comment) => {
  return async (dispatch) => {
    const newBlogWithComment = {
      ...blog,
      comments: blog.comments.concat(comment),
    }
    await blogServices.update(blog.id, newBlogWithComment)
    dispatch({ type: 'COMMENT', data: newBlogWithComment })
  }
}
export default blogReducer
