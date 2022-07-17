const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
    }

    type Book {
    _id: ID!
    author: [String]
    bookId: String!
    description: String!
    title: String!
    image: String!
    link: String!
    }

    type Auth {
    token: ID!
    user: User
    }

    type Query {
    me: User
    users: [User]
    user(email:String!):User
    }

    type Mutation {
    login(email:String!, password:String!):Auth
    addUser(username: String!, email:String!, password: String!): Auth
    saveBook(_id: String!, author: String!, bookId: String!, description: String!, title: String!, image: String!, link: String!): User
    removeBook(_id: String!): User
    }
`;

module.exports = typeDefs;
