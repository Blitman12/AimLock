import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user{
                _id
                username
            }
        }
    }
`

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`

export const ADD_GAME = gql`
    mutation addGame($gameName: String!, $mouseDPI: String!, $mouseSensitivity: String!) {
        addGame(gameName: $gameName, mouseDPI: $mouseDPI, mouseSensitivity: $mouseSensitivity) {
            gameName
            mouseDPI
            mouseSensitivity
        }
    }
`