import React, {useState} from 'react'
import {useMutation} from '@apollo/client'
import { TextField, Button } from '@mui/material';
import { ADD_USER } from '../utils/mutations'
import Auth from '../utils/auth';

export default function Signup() {

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
            <form onSubmit={handleFormSubmit}>
                <TextField label="Email:" id="email" type="email" name="email" value={formState.email} onChange={handleChange}></TextField>
                <TextField label="Username:" id="username" type="username" name="username" value={formState.username} onChange={handleChange}></TextField>
                <TextField label="Password:" id="password" type="password" name="password" value={formState.password} onChange={handleChange}></TextField>
                <Button color="inherit" variant="outlined" type="submit">Submit</Button>
                {error && <div>login Failed</div>}
            </form>
        </div>
    )
}
