import * as loginServices from '../service/login'
import * as blogServices from '../service/blogs'

const loginReducer = (state = [], action) => {
  switch (action.type) {
    case 'CHECK_USER':
      return action.data
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const checkUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogServices.setToken(user.token)
    return { type: 'CHECK_USER', data: user }
  }

  return { type: 'CHECK_USER', data: null }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginServices.login(credentials)
      blogServices.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch({
        type: 'LOGIN',
        data: user,
      })
    } catch (error) {
      return error
    }
  }
}

export const logout = () => {
  window.localStorage.clear('loggedBlogappUser')
  return { type: 'LOGOUT' }
}

export default loginReducer
