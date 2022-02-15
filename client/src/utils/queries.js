import { gql } from '@apollo/client';


export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            games {
                gameName
                mouseDPI
                mouseSensitivity
            }
        }
    }
`

