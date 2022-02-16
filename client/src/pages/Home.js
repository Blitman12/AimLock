import React from 'react'
import { makeStyles } from '@mui/styles'
import Logo from '../assets/logo.png'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '120px'
    },
    title: {
        fontSize: '100px'
    },
    phrase: {
        fontSize: '25px'
    },
    logo: {
        width: '70px',
        height: '70px'
    }
})

function Home() {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <h1 className={classes.title}><img alt="target" src={Logo} className={classes.logo}/> Aim Lock</h1>
            <p className={classes.phrase}>Keeps your aim true</p>
        </div>
    )
}

export default Home
