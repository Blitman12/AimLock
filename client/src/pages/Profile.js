import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { QUERY_ME } from '../utils/queries'
import { useQuery } from '@apollo/client';
import Game from '../components/Game';
import { Box, Button, List } from '@mui/material';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    title: {
        fontSize: '75px',
        textAlign: 'center'
    },
    buttonLink: {
        textDecoration: 'none',
    },
    button: {
        textAlign: 'center'
    },
    boxContainer: {
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px'
    }
})

const Profile = () => {
    const { username: userParam } = useParams()
    const classes = useStyles()

    const { loading, data } = useQuery(QUERY_ME, {
        variables: { username: userParam },
        fetchPolicy: "network-only"
    })

    const user = data?.me || {};

    if (loading) {
        return <div>Loading...</div>
    }
    if (!user?.username) {
        return (
            <h3>
                You need to be logged in to see this page. Use the navigation links above to sign up or log in!
            </h3>
        )
    }

    return (
        <div>
            <h1 className={classes.title}>{user.username}`s Games</h1>
            <div className={classes.button}>
                <Link to="/addGame" className={classes.buttonLink}><Button variant="contained">Add A Game</Button></Link>
            </div>
            <Box sx={{ width: '100%', maxWidth: 200, bgcolor: 'primary.main' }} className={classes.boxContainer}>
                <nav aria-label="secondary mailbox folders">
                    <List>
                        {user.games.length > 0 ? user.games.map(game => {
                            return (
                                <Game name={game.gameName} key={game._id} sens={game.mouseSensitivity} dpi={game.mouseDPI} id={game._id} userId={user._id} />
                            )
                        }) : (
                            <>
                                <h1> There are no added games yet, You should add some! </h1>
                            </>
                        )}
                    </List>
                </nav>
            </Box>
        </div>
    )
}

export default Profile;