import * as anecdoteServices from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const modifiedState = [...state]
      console.log(action.data)
      modifiedState.find((anecdote) => anecdote.id === action.data).votes++
      return modifiedState
    case 'ADD_ANECDOTE':
      const newState = [
        ...state,
        { content: action.data, id: getId(), votes: 0 },
      ]
      return newState
    default:
      return state
  }
}
export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}
export const addVote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteServices.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch({ type: 'VOTE', data: anecdote.id })
  }
}
export const addAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteServices.create({ content: anecdote, id: getId(), votes: 0 })
    dispatch({ type: 'ADD_ANECDOTE', data: anecdote })
  }
}

export default anecdoteReducer
