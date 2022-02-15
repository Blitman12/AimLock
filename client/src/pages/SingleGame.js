import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Auth from '../utils/auth'
import { useMutation } from '@apollo/client';
import { REMOVE_GAME, UPDATE_GAME } from '../utils/mutations'

const SingleGame = ({ location }) => {
    const history = useHistory()
    const [removeGame, { error }] = useMutation(REMOVE_GAME)
    const [updateGame] = useMutation(UPDATE_GAME)
    const { name, dpi, id, sens, userId } = location.state.props
    const [formState, setFormState] = useState({ mouseDPI: dpi, mouseSensitivity: sens })

    if (!Auth.loggedIn()) {
        return history.push('/')
    }

    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        })
    }
    const handleDeleteClick = async event => {
        event.preventDefault()
        try {
            await removeGame({
                variables: { gameId: id, userId: userId }
            })
            history.push('/profile')
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateClick = async event => {
        event.preventDefault()
        try {
            await updateGame({
                variables: {gameId: id, userId: userId, ...formState}
            })
            history.push('/profile')
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div>
            <h1>{name}</h1>
            <p>Mouse DPI: {formState.mouseDPI}</p><TextField value={formState.mouseDPI} onChange={handleChange} name="mouseDPI" placeholder={dpi}></TextField>
            <p>Mouse Sensitivity: {formState.mouseSensitivity} </p><TextField value={formState.mouseSensitivity} onChange={handleChange} name="mouseSensitivity" placeholder={sens}></TextField>
            <br></br>
            <br></br>
            <Button variant="contained" onClick={handleDeleteClick}>Delete Game</Button>
            <Button variant="contained" onClick={handleUpdateClick} color="success">Update Game</Button>
            {error && <div>Something Went wrong</div>}
        </div>
    )
}

export default SingleGame;
