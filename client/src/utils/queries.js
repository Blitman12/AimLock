import { gql } from '@apollo/client';


export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            games {
                _id
                gameName
                mouseDPI
                mouseSensitivity
            }
        }
    }
`

