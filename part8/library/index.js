const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub,
} = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { v1: uuid } = require('uuid')
const MONGODB_URI = process.env.MONGODB_URI
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const pubsub = new PubSub()

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
    id: ID!
    author: Author!
    genres: [String!]
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genres: String): [Book!]!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    addAuthor(name: String!, born: Int): Author
    editAuthor(name: String!, setBornTo: Int): Author
    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allBooks: async (root, args) => {
      // if (args.author && args.genres) {
      //   return books
      //     .filter((book) => book.author === args.author)
      //     .filter((book) => book.genres.includes(args.genres))
      // }
      // if (args.author) {
      //   return books.filter((book) => book.author === args.author)
      // }

      if (args.genres) {
        console.log(args.genres)
        return Book.find({ genres: { $in: [args.genres] } }).populate('author')
      }

      return Book.find().populate('author')
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({}).populate('author')
      return authors.map((author) => ({
        name: author.name,
        born: author.born,
        bookCount: books.filter((book) => book.author.name === author.name)
          .length,
      }))
    },
    findAuthor: async (root, args) => await Author.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (await Book.findOne({ title: args.title })) {
        throw new UserInputError('Book title must be unique', {
          invalidArgs: args.title,
        })
      }
      if (args.title.length < 2) {
        throw new UserInputError('Title length must be more than  2', {
          invalidArgs: args.title,
        })
      }
      const book = new Book({ ...args })
      const author = await Author.findOne({ name: args.author })
      if (author) {
        book.author = author
      } else {
        const author = new Author({ name: args.author })
        book.author = await author.save()
      }
      book = await Book.findById(book.id).populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book.save()
    },
    addAuthor: async (root, args) => {
      if (args.name.length < 4) {
        throw new UserInputError('Title length must be more than  4', {
          invalidArgs: args.title,
        })
      }
      if (await Author.findOne({ name: args.name })) {
        throw new UserInputError('Author title must be unique', {
          invalidArgs: args.name,
        })
      }
      const author = new Author({ name: args.name })
      return author.save()
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      console.log(currentUser)
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      if (author) {
        if (args.setBornTo) {
          author.born = args.setBornTo
        } else {
          author.born = null
        }
      } else {
        throw new UserInputError('cant find author', {
          invalidArgs: args.name,
        })
      }
      return author.save()
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })
      console.log(user)
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
