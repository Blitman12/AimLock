import { Button } from '@mui/material'
import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import Auth from '../utils/auth'
import { useMutation } from '@apollo/client';
import { REMOVE_GAME } from '../utils/mutations'

const SingleGame = ({location}) => {
    const [removeGame, {error}] = useMutation(REMOVE_GAME)
    const history = useHistory()

    if(!Auth.loggedIn()) {
        return <Redirect to="/" />
    }

    const {name, dpi, id, sens, userId} = location.state.props
    
    const handleClick = async event => {
        event.preventDefault()
        try {
            await removeGame({
                variables: {gameId: id, userId: userId}
            })
            history.push('/profile')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>{name}</h1>
            <p>{dpi}</p>
            <p>{sens}</p>
            <Button variant="contained" onClick={handleClick}>Delete Game</Button>
        </div>
    )
}

export default SingleGame;
