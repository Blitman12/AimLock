import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../utils/auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const Header = () => {
    const logout = event => {
        event.preventDefault()
        Auth.logout()
    }

    return (
        <header>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <Link to="/">
                                <TrackChangesIcon />
                            </Link>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            AimLock
                        </Typography>
                        {Auth.loggedIn() ? (
                            <>
                                <Link to="/profile"><Button color="inherit">Profile</Button></Link>
                                <Button color="inherit" onClick={logout}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login"><Button color="inherit">Login</Button></Link>
                                <Link to="/signup"><Button color="inherit">Signup</Button></Link>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    )
}

export default Header;