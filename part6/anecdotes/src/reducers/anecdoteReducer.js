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
export const initAnecdotes = (anecdotes) => {
  return { type: 'INIT_ANECDOTES', data: anecdotes }
}
export const addVote = (id) => ({ type: 'VOTE', data: id })
export const addAnecdote = (anecdote) => ({
  type: 'ADD_ANECDOTE',
  data: anecdote,
})

export default anecdoteReducer
