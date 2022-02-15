import React from 'react'

const Game = (props) => {
    console.log(props)
    return (
        <div>
            <h1>{props.name}</h1>
            <p>Mouse Sensitivity: {props.sens}</p>
            <p>Mouse DPI: {props.dpi}</p>
        </div>
    )
}

export default Game