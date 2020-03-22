import gql from "graphql-tag";
export const GET_AUTHORS = gql`
  query {
    authors {
      id
      name
      age
    }
  }
`;
