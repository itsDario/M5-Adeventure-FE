import React, { Component } from 'react'

export default class Slime extends Component {

    state = {
        x: 400,
        y: 500,
    }

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    color: 'green',
                    top: `${this.props.location.y}px`,
                    left: `${this.props.location.x}px`,
                }}
            >
                S
            </div>
        )
    }
}
