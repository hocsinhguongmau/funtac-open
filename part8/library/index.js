const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()
const Author = require('./models/author')
const Book = require('./models/book')
const { v1: uuid } = require('uuid')
const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Authors!
    id: ID!
    genres: [String!]
  }
  type Authors {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genres: String): [Book!]!
    allAuthors: [Authors!]!
    findAuthor(name: String!): Authors
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]
    ): Book
    addAuthor(name: String!, born: Int): Authors
    editAuthor(name: String!, setBornTo: Int): Authors
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({})
      // if (args.author && args.genres) {
      //   return books
      //     .filter((book) => book.author === args.author)
      //     .filter((book) => book.genres.includes(args.genres))
      // }
      // if (args.author) {
      //   return books.filter((book) => book.author === args.author)
      // }
      if (args.genres) {
        return books.filter((book) => book.genres.includes(args.genres))
      }
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({})
      return authors.map((author) => ({
        name: author.name,
        born: author.born,
        bookCount: books.filter((book) => book.author === author.name).length,
      }))
    },
    findAuthor: async (root, args) => await Author.findOne({ name: args.name }),
  },
  Mutation: {
    addBook: async (root, args) => {
      if (await Book.findOne({ title: args.title })) {
        throw new UserInputError('Book title must be unique', {
          invalidArgs: args.title,
        })
      }
      const book = new Book({ ...args })
      const author = await Author.findOne({ name: args.author })
      if (author) {
        book.author = author._id
      } else {
        const author = new Author({ name: args.author })
        book.author = await author.save()._id
      }
      return book.save()
    },
    addAuthor: async (root, args) => {
      if (await Author.findOne({ name: args.name })) {
        throw new UserInputError('Author title must be unique', {
          invalidArgs: args.name,
        })
      }
      const author = new Author({ name: args.name })
      return author.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (author) {
        if (args.setBornTo) {
          author.born = args.setBornTo
        } else {
          author.born = null
        }
        console.log(author)
      } else {
        throw new UserInputError('cant find author', {
          invalidArgs: args.name,
        })
      }
      return author.save()
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
