import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    quakes: [Quake]!
    quake(id: ID!): Quake
    # Queries for the current user
    me: User
  }

  type Quake {
    id: ID
    magnitude: Float
    location: String
    when: String
    time: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    records: [Quake]
  }

  type Mutation {
    # if false, saving record failed -- check errors
    saveRecord(recordId: ID!, recordWhen: String): RecordUpdateResponse!

    # if false, deleting record failed -- check errors
    deleteRecord(recordId: ID!): RecordUpdateResponse!

    login(email: String): String # login token
  }

  type RecordUpdateResponse {
    success: Boolean!
    message: String
    records: [Quake]
  }
`;

export default typeDefs;
