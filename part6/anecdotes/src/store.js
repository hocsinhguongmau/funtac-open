import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const composeEnhancers = composeWithDevTools({})
const reducer = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
})

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
export default store
