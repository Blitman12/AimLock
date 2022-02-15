import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '200px',
        justifyContent: 'space-between',
    },
    loginForm: {
        width: '15%'
    },
    title: {
        textAlign: 'center'
    }
})

const Login = () => {
    const classes = useStyles()
    const [formState, setFormState] = useState({ email: '', password: '' })
    const [login, { error }] = useMutation(LOGIN_USER)

    const handleChange = event => {
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value
        })
        console.log(formState)
    }

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState }
            })
            Auth.login(data.login.token)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h1 className={classes.title}>Login</h1>
            <form onSubmit={handleFormSubmit} className={classes.loginContainer}>
                <TextField className={classes.loginForm} label="Email:" id="email" type="email" name="email" value={formState.email} onChange={handleChange}></TextField>
                <TextField className={classes.loginForm} label="Password:" id="password" type="password" name="password" value={formState.password} onChange={handleChange}></TextField>
                <Button variant="contained" color="success" type="submit">Login</Button>
                {error && <div>login Failed</div>}
            </form>
        </div>
    )
}

export default Login;