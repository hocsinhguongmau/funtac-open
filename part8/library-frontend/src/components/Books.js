import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../query'

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      setBooks(data.allBooks)
    },
  })
  useEffect(() => {
    const genres = []
    books.forEach((book) => {
      if (book.genres) {
        book.genres.forEach((genre) => {
          genres[genre] = genre
        })
      }
    })
    setGenres(Object.keys(genres))
  }, [books])
  const handleFilter = (e) => {
    console.log(e)
  }
  if (!props.show) {
    return null
  }
  return result.loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.map((genre) => genre + ' ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => handleFilter(genre)}>
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Books
