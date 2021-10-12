import React, { useState } from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ADD_BOOK, ALL_BOOKS, EDIT_AUTHOR } from './query'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthor from './components/EditAuthor'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)

  const [page, setPage] = useState('authors')
  const allAuthors = useQuery(ALL_AUTHORS)
  const [error, setError] = useState(null)

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error)
      setError(error.graphQLErrors[0].message)
    },
  })
  const client = useApolloClient()
  const handleLogout = () => {
    setToken(null)
    localStorage.clear('phonenumbers-user-token')
    client.resetStore()
  }

  return (
    <div>
      {error ? error : null}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token === null ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={handleLogout}>logout</button>
          </>
        )}
      </div>
      {allAuthors.loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Authors
            authors={allAuthors.data.allAuthors}
            show={page === 'authors'}
          />
          {token !== null ? (
            <EditAuthor
              authors={allAuthors.data.allAuthors}
              editAuthor={editAuthor}
              show={page === 'authors'}
            />
          ) : null}
        </>
      )}

      <Books show={page === 'books'} />

      <NewBook createBook={createBook} show={page === 'add'} />
      <LoginForm setToken={setToken} setError={error} show={page === 'login'} />
    </div>
  )
}

export default App
