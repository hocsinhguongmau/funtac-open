import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterAnecdotes, FilterAnecdotes } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const [filterText, setFilterText] = useState('')
  const handleFilter = (e) => {
    setFilterText(e.target.value)
    dispatch(filterAnecdotes(e.target.value))
  }
  return (
    <div>
      <input type='text' value={filterText} onChange={handleFilter} />
    </div>
  )
}

export default Filter
