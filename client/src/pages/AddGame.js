import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { useMutation } from '@apollo/client';
import { ADD_GAME } from '../utils/mutations';
import { useHistory } from 'react-router-dom';

export default function AddGame() {
    const [formState, setFormState] = useState({ gameName: '', mouseDPI: '', mouseSensitivity: '' })
    const [addGame, { error }] = useMutation(ADD_GAME)
    const history = useHistory()

    const handleChange = event => {
        const { name, value } = event.target
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            await addGame({
                variables: { ...formState }
            })
            setFormState({ gameName: '', mouseDPI: '', mouseSensitivity: '' })
            history.push("/profile")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <TextField label="Game:" id="gameName" name="gameName" value={formState.gameName} onChange={handleChange}></TextField>
                <TextField label="Mouse DPI:" id="mouseDPI" name="mouseDPI" value={formState.mouseDPI} onChange={handleChange}></TextField>
                <TextField label="Mouse Sensitivity:" id="mouseSensitivity" name="mouseSensitivity" value={formState.mouseSensitivity} onChange={handleChange}></TextField>
                <Button color="inherit" variant="outlined" type="submit">Submit</Button>
                {error && <div>Something went wrong!</div>}
            </form>
        </div>

    )
}
