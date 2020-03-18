import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    books: Books!
    book(id: ID!): Book!
    authors: Authors!
    author(id: ID!): Author!
    # Queries for the current user
    me: User
  }

  type Book {
    id: ID!
    title: String!
    genre: String!
    name: String!
    status: Boolean!
    authorID: ID
  }

  type Author {
    id: ID!
    name: String!
    age: Int!
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
    data: [Book]!
  }

  type Authors {
    data: [Author]!
  }

  type Mutation {
    addBook(title: String!, genre: String!, name: String!): Book!
    deleteBook(bookId: ID!): Book!
    addAuthor(name: String!, age: Int!): Author!
    deleteAuthor(authorId: ID!): Author!
    login(email: String): String # login token
  }
`;

export default typeDefs;
