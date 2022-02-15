import React from 'react'
import { makeStyles } from '@mui/styles'
import LockIcon from '@mui/icons-material/Lock';

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
    }
})

function Home() {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <h1 className={classes.title}><LockIcon fontSize="large"/> Aim Lock <LockIcon fontSize="large"/></h1>
            <p className={classes.phrase}>Never forget your settings</p>
        </div>
    )
}

export default Home
