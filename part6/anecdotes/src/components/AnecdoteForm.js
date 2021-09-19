import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

export default function AnecdoteForm() {
  const dispatch = useDispatch()
  const [anecdote, setAnecdote] = useState('')
  const handleAnecdote = (e) => {
    setAnecdote(e.target.value)
  }
  const handleAddAnecdote = (e) => {
    e.preventDefault()
    dispatch(addAnecdote(anecdote))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input value={anecdote} onChange={handleAnecdote} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}
