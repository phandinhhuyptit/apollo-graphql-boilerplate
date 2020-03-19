import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    books: [Book!]
    book(id: ID!): Book!
    authors: Authors!
    author(id: ID!): Author!
    # Queries for the current user
    me: User
  }

  type Book {
    id: ID!
    title: String
    genre: String
    name: String
    status: Boolean!
    authorId: ID
  }

  type Author {
    id: ID!
    name: String!
    age: Int!
    book: [ID!]
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
  }
`;

export default typeDefs;
