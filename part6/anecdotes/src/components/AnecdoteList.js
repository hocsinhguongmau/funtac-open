import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initAnecdotes } from '../reducers/anecdoteReducer'

export default function AnecdoteList() {
  const dispatch = useDispatch()

  const handleAddVote = (anecdote) => {
    const message = `You voted '${anecdote.content}'`
    dispatch(addVote(anecdote))
    dispatch(setNotification(message, 5))
  }

  useEffect(() => {
    dispatch(initAnecdotes(anecdotes))
  }, [dispatch])

  const filter = useSelector((state) => state.filter)

  const anecdotes = useSelector((state) => {
    if (filter === '') {
      return state.anecdote
    }
    const regex = new RegExp(filter, 'i')
    return state.anecdote.filter((anecdote) => anecdote.content.match(regex))
  })
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
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
