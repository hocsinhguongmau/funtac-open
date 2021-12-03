import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../query'

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState([])
  const [meuBooks, setMeuBooks] = useState()
  const [genreBook, setGenreBook] = useState('')

  const result = useQuery(ALL_BOOKS)
  const [filteredBooks, filteredBooksResult] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (result.data && !genreBook) {
      const books = result.data.allBooks
      setBooks(books)
    }
  }, [result.data, genreBook])

  useEffect(() => {
    if (filteredBooksResult.data) {
      setBooks(filteredBooksResult.data.allBooks)
    }
  }, [filteredBooksResult.data])

  const meResult = useQuery(ME, {
    onCompleted: (data) => {
      console.log(data)
      const myBook = books.filter((book) =>
        book.genres.includes(data.me.favoriteGenre),
      )
      setMeuBooks(myBook)
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

  useEffect(() => {
    console.log(meResult)
  }, [meResult])

  const handleFilter = (genre) => {
    setGenreBook(genre)
    filteredBooks({
      variables: {
        genres: genre,
      },
    })
  }

  if (!props.show) {
    return null
  }
  return result.loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h2>Books</h2>
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
      <button onClick={() => handleFilter(null)}>all books</button>
      {genres.map((genre) => (
        <button key={genre} onClick={() => handleFilter(genre)}>
          {genre}
        </button>
      ))}
      {/* {meResult.loading ? null : (
        <>
          <h2>Recommend books</h2>
          <p>Books in your favorite genre {meResult.data.me.favoriteGenre}</p>
          {meuBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </>
      )} */}
    </div>
  )
}

export default Books
