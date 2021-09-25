import * as blogServices from '../service/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOG':
      return action.data
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'DEL_BLOG': {
      const modifiedBlog = state.filter((blog) => blog.id !== action.data)
      return modifiedBlog
    }

    case 'ADD_LIKES': {
      const modifiedState = [...state]
      modifiedState.find((blog) => blog.id === action.data.id).likes++
      return modifiedState
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
  return async (dispatch) => {
    await blogServices.remove(id)
    dispatch({ type: 'DEL_BLOG', data: id })
  }
}

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    await blogServices.create(newBlog)
    dispatch({ type: 'ADD_BLOG', data: newBlog })
  }
}

export default blogReducer
