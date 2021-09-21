import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

function AnecdoteForm(props) {
  const [anecdote, setAnecdote] = useState('')
  const handleAnecdote = (e) => {
    setAnecdote(e.target.value)
  }
  const handleAddAnecdote = (e) => {
    e.preventDefault()
    props.addAnecdote(anecdote)
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
const mapDispatchToProps = {
  addAnecdote,
}
export default connect(null, mapDispatchToProps)(AnecdoteForm)
