import React, { useState } from 'react'

export default function EditAuthor(props) {
  const [name, setName] = useState('')
  const [year, setYear] = useState(null)
  const handleSelect = (e) => {
    setName(e.target.value)
  }
  const handleChangeBirth = (e) => {
    e.preventDefault()
    props.editAuthor({
      variables: {
        name: name,
        setBornTo: year,
      },
    })
  }
  const authors = props.authors
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleChangeBirth}>
        <p>
          <select onChange={handleSelect}>
            <option value=''>Select author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </p>
        <p>
          born{' '}
          <input
            type='number'
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
        </p>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
