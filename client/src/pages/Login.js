import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';
import { TextField, Button } from '@mui/material';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' })
    const [login, { error }] = useMutation(LOGIN_USER)

    const handleChange = event => {
        const {name, value} = event.target

        setFormState({
            ...formState,
            [name]: value
        })
        console.log(formState)
    }

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            const {data} = await login({
                variables: {...formState}
            })
            Auth.login(data.login.token)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <TextField label="Email:" id="email" type="email" name="email" value={formState.email} onChange={handleChange}></TextField>
            <TextField label="Password:" id="password" type="password" name="password" value={formState.password} onChange={handleChange}></TextField>
            <Button color="inherit" variant="outlined" type="submit">Submit</Button>
            {error && <div>login Failed</div>}
        </form>
    )
}

export default Login;