import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, EDIT_AUTHOR } from './query'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthor from './components/EditAuthor'

const App = () => {
  const [page, setPage] = useState('authors')
  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)
  const [error, setError] = useState(null)

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  return (
    <div>
      {error ? error : null}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      {allAuthors.loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Authors
            authors={allAuthors.data.allAuthors}
            show={page === 'authors'}
          />
          <EditAuthor
            authors={allAuthors.data.allAuthors}
            editAuthor={editAuthor}
          />
        </>
      )}
      {allBooks.loading ? (
        <div>Loading...</div>
      ) : (
        <Books books={allBooks.data.allBooks} show={page === 'books'} />
      )}
      <NewBook createBook={createBook} show={page === 'add'} />
    </div>
  )
}

export default App
