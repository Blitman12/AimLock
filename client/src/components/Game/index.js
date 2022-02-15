import React from 'react'
import { Link } from 'react-router-dom'

const Game = (props) => {
    return (
        <Link to={{ pathname: "/singleGame", state: {props}}}>
            <div>
                <h1>{props.name}</h1>
            </div>
        </Link>
    )
}

export default Game