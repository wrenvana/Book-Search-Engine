import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
        _id
        username
        email
        }
    }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
        _id
        username
        email
        }
    }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: bookInput!) {
    saveBook(input: $input) {
        _id
        username
        savedBooks {
        authors
        description
        bookId
        image
        title
        link
        }
    }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
        username
        savedBooks {
        authors
        description
        bookId
        image
        title
        link
        }
    }
    }
`;