import { gql } from "apollo-server";

const typeDefs = gql`
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

  type realtimeBook {
    id: ID!
    title: String
    genre: String
    name: String
    status: Boolean!
    author: String
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

  type RecordDeleteResponse {
    id: String!
    message: String
  }
  

  type Query {
    books: [Book!]
    book(bookId: ID!): Book!
    authors: [Author!]
    author(authorId: ID!): Author!
    # Queries for the current user
    me: User
  }

  type Mutation {
    addBook(title: String!, genre: String!, name: String!, authorId: ID): Book!
    deleteBook(bookId: ID!): RecordDeleteResponse!
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

  type Subscription {
    listBooks: [Book!]
    autoAddBook : Book!
    autoRemoveBook : RecordDeleteResponse!
  }
`;

export default typeDefs;
