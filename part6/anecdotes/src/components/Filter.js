import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleFilter = (e) => {
    dispatch(filterAnecdotes(e.target.value))
  }
  return (
    <div>
      <input type='text' onChange={handleFilter} />
    </div>
  )
}

export default Filter
