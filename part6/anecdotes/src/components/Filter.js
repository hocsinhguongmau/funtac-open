import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleFilter = (e) => {
    props.filterAnecdotes(e.target.value)
  }
  return (
    <div>
      <input type='text' onChange={handleFilter} />
    </div>
  )
}

const mapDispatchToProps = {
  filterAnecdotes,
}
export default connect(null, mapDispatchToProps)(Filter)
