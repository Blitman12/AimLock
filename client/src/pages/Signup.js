import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { TextField, Button } from '@mui/material';
import { ADD_USER } from '../utils/mutations'
import Auth from '../utils/auth';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '300px',
        justifyContent: 'space-between',
    },
    signupForm: {
        width: '15%'
    },
    title: {
        textAlign: 'center'
    }
})


const Signup = () => {
    const classes = useStyles()
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER)

    // update state based on form input changes
    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    // submit form
    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            const { data } = await addUser({
                variables: { ...formState }
            })
            Auth.login(data.addUser.token)
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div>
            <h1 className={classes.title}>Sign Up</h1>
            <form onSubmit={handleFormSubmit} className={classes.formContainer}>
                <TextField className={classes.signupForm} label="Email:" id="email" type="email" name="email" value={formState.email} onChange={handleChange}></TextField>
                <TextField className={classes.signupForm} label="Username:" id="username" type="username" name="username" value={formState.username} onChange={handleChange}></TextField>
                <TextField className={classes.signupForm} label="Password:" id="password" type="password" name="password" value={formState.password} onChange={handleChange}></TextField>
                <Button variant="contained" color="success" type="submit">Submit</Button>
                {error && <div>sign up Failed</div>}
            </form>
        </div>
    )
}

export default Signup;