import gql from "graphql-tag";
export const GET_BOOKS = gql`
query {
  books {
    id
    title
    status
    name
    genre
    author {
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
      title
      genre
      name
      status
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
      message
    }
  }
`;


export const SUBSCRIPTIONS_ADD_BOOK = gql`
subscription autoAddBook{
  autoAddBook {
    id
    title
    genre
    name
    status
    author {
      age
      name
    } 
  }
}
`;

export const SUBSCRIPTIONS_REMOVE_BOOK = gql`
  subscription autoRemoveBook {
    autoRemoveBook {
    id
    }
}
`;

export const SUBSCRIPTIONS_UPDATE_BOOK = gql`
  subscription autoUpdateBook {
    autoUpdateBook {
      id
      title
      genre
      name
      status
    }
}
`;

