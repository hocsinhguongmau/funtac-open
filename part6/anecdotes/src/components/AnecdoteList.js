import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initAnecdotes } from '../reducers/anecdoteReducer'

function AnecdoteList(props) {
  const handleAddVote = (anecdote) => {
    const message = `You voted '${anecdote.content}'`
    props.addVote(anecdote)
    props.setNotification(message, 5)
  }

  useEffect(() => {
    props.initAnecdotes(props.anecdotes)
  }, [props.initAnecdotes])

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleAddVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

const mapDispatchToProps = {
  addVote,
  setNotification,
  initAnecdotes,
}

const mapStateToProps = (state) => {
  if (state.filter === '') {
    return {
      anecdotes: state.anecdote,
    }
  }

  const regex = new RegExp(state.filter, 'i')
  return {
    anecdotes: state.anecdote.filter((anecdote) =>
      anecdote.content.match(regex),
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
