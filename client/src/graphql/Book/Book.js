import gql from "graphql-tag";
export const GET_BOOKS = gql`
  query {
    books {
      title
      status
      name
      genre
      author {
        id
        age
        name
      }
    }
  }
`;

export const GET_BOOK = gql`
  query book($bookId: ID!) {
    book(bookId: $bookId) {
      title
      status
      name
      genre
      author {
        id
        age
        name
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $genre: String!
    $name: String!
    $authorId: ID
  ) {
    addBook(title: $title, genre: $genre, name: $name, authorId: $authorId) {
      id
    }
  }
`;
