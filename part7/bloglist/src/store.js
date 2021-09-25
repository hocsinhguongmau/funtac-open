import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
const reducer = combineReducers({
  blogs: blogReducer,
  login: loginReducer,
  filter: filterReducer,
  notification: notificationReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store
