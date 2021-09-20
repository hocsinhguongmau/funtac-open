import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import {
  delNotification,
  setNotification,
} from '../reducers/notificationReducer'
import { initAnecdotes } from '../reducers/anecdoteReducer'
import * as anecdoteServices from '../services/anecdotes'

export default function AnecdoteList() {
  const filter = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) =>
    state.anecdote.sort((a, b) => b.votes - a.votes),
  )
  const [state, setState] = useState([])
  const dispatch = useDispatch()

  const handleAddVote = (id, content) => {
    const message = `You voted '${content}'`
    dispatch(addVote(id))
    dispatch(setNotification(message))
  }
  useEffect(() => {
    anecdoteServices.getAll().then((anecdotes) => {
      dispatch(initAnecdotes(anecdotes))
      setState(anecdotes)
    })
  }, [dispatch])
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(delNotification())
    }, 5000)
    return () => clearTimeout(timer)
  }, [handleAddVote])

  useEffect(() => {
    const searchString = filter.toLowerCase().split(' ')
    const filteredState = anecdotes.filter((anecdote) => {
      let containsAtLeastOneWord = false
      searchString.forEach((word) => {
        if (anecdote.content.toLowerCase().includes(word))
          containsAtLeastOneWord = true
      })
      if (containsAtLeastOneWord) {
        return anecdote
      } else {
        return null
      }
    })
    setState(filteredState)
  }, [filter])
  return (
    <div>
      {filter}
      <h2>Anecdotes</h2>
      {state.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => handleAddVote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
