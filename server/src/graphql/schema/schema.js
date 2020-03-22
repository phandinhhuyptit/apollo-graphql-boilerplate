import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    books: [Book!]
    book(bookId: ID!): Book!
    authors: [Author!]
    author(authorId: ID!): Author!
    # Queries for the current user
    me: User
  }

  type Book {
    id: ID!
    title: String
    genre: String
    name: String
    status: Boolean!
    author: Author
  }

  type Author {
    id: ID!
    name: String!
    age: Int!
    books: [Book!]
  }

  type User {
    """
    This is field user
    """
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Books {
    data: [Book!]
  }

  type Authors {
    data: [Author]!
  }

  type Mutation {
    addBook(title: String!, genre: String!, name: String!, authorId: ID): Book!
    deleteBook(bookId: ID!): Book!
    addAuthor(name: String!, age: Int!, bookId: [ID]): Author!
    deleteAuthor(authorId: ID!): Author!
    login(email: String): String # login token
    updateAuthor(authorId: ID!, title: String, age: Int): Author
    updateBook(
      BooId: ID!
      title: String
      genre: String
      name: String
      status: Boolean
    ): Book
  }
`;

export default typeDefs;