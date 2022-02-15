import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    link: {
        textDecoration: 'none'
    }
})

const Game = (props) => {
    const classes = useStyles()
    return (
        <Link to={{ pathname: "/singleGame", state: { props } }} className={classes.link}>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary={props.name} sx={{color: 'text.primary'}}/>
                </ListItemButton>
            </ListItem>
        </Link>
    )
}

export default Game