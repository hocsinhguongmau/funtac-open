import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    bookCount
    born
  }
`
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      ...AuthorDetails
    }
    genres
    published
  }
  ${AUTHOR_DETAILS}
`

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

const ALL_BOOKS = gql`
  query allBooks($genres: String) {
    allBooks(genres: $genres) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
const FIND_AUTHOR = gql`
  query findAuthorByName($nameToSearch: String!) {
    findAuthor(name: $nameToSearch) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`
const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
const EDIT_AUTHOR = gql`
  mutation setBirthAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export {
  ALL_AUTHORS,
  ALL_BOOKS,
  FIND_AUTHOR,
  ADD_BOOK,
  EDIT_AUTHOR,
  LOGIN,
  ME,
  BOOK_ADDED,
}
