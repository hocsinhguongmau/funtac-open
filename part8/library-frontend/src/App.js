import React, { useState, useEffect } from 'react'
import {
  useQuery,
  useMutation,
  useApolloClient,
  useSubscription,
} from '@apollo/client'
import {
  ALL_AUTHORS,
  ADD_BOOK,
  ALL_BOOKS,
  EDIT_AUTHOR,
  BOOK_ADDED,
} from './query'

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
  useEffect(() => {
    const hmm = localStorage.getItem('phonenumbers-user-token')
    if (hmm) {
      setToken(hmm)
    }
  }, []) // eslint-disable-line
  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const client = useApolloClient()
  const handleLogout = () => {
    setToken(null)
    localStorage.clear('phonenumbers-user-token')
    client.resetStore()
  }
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map((p) => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      alert('new book ' + book.title + ' by ' + book.author.name)
      updateCacheWith(book)
    },
  })

  console.log(allAuthors.data)
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
      {allAuthors.loading && !allAuthors.data ? (
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
      <LoginForm
        setToken={setToken}
        setError={error}
        setPage={setPage}
        show={page === 'login'}
      />
    </div>
  )
}

export default App
