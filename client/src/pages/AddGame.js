import React, { useState } from 'react'
import { TextField, Button, Paper } from '@mui/material'
import { useMutation } from '@apollo/client';
import { ADD_GAME } from '../utils/mutations';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    addGameContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '320px',
        width: '250px',
        justifyContent: 'space-between',
        textAlign: 'center',
        margin: '0 auto',
        marginTop: '10px',
        marginBottom: '10px'
    },
    title: {
        textAlign: 'center'
    }
})


export default function AddGame() {
    const classes = useStyles()
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
            <h1 className={classes.title}>Add A Game</h1>
            <Paper elevation={24} className={classes.addGameContainer}>
                <form onSubmit={handleFormSubmit} className={classes.addGameContainer}>
                    <TextField label="Game:" id="gameName" name="gameName" value={formState.gameName} onChange={handleChange}></TextField>
                    <TextField label="Mouse DPI:" id="mouseDPI" name="mouseDPI" value={formState.mouseDPI} onChange={handleChange}></TextField>
                    <TextField label="Mouse Sensitivity:" id="mouseSensitivity" name="mouseSensitivity" value={formState.mouseSensitivity} onChange={handleChange}></TextField>
                    <Button variant="contained" color="success" type="submit">Add Game</Button>
                    {error && <div>Something went wrong!</div>}
                </form>
            </Paper>
        </div>

    )
}
