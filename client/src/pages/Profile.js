import React from 'react'
import { useParams, Link } from 'react-router-dom';
import {QUERY_ME} from '../utils/queries'
import { useQuery } from '@apollo/client';
import Game from '../components/Game';
import { Button } from '@mui/material';

const Profile = () => {
    const {username: userParam} = useParams()

    const {loading, data} = useQuery(QUERY_ME, {
        variables: {username: userParam},
        fetchPolicy: "network-only"
    })

    // if(Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    //     return <Redirect to="/profile" /> 
    // }

    const user = data?.me /* || data?.user */ || {};

    if (loading) {
        return <div>Loading...</div>
    }
    if(!user?.username) {
        return (
            <h3>
                You need to be logged in to see this page. Use the navigation links above to sign up or log in!
            </h3>
        )
    }

    return (
        <div>
            <h1>{user.username}`s Games</h1>
            {user.games.length > 0 ? user.games.map(game => {
                return (
                    <Game name={game.gameName} key={game._id} sens={game.mouseSensitivity} dpi={game.mouseDPI} id={game._id} userId={user._id} />
                )
            }) : (
                <>
                    <h1> There are no added games yet, You should add some! </h1>
                </>
            )}
            <Link to="/addGame"><Button variant="contained">Add A Game</Button></Link>
        </div>
    )
}

export default Profile;