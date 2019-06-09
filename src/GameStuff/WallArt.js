import React, { Component } from 'react'
import Wall1 from '../images/walls/brickWall.png'


export default class WallArt extends Component {

    state = {
    }

    makeWallImageGrid = () => {

        return this.props.wallArea.map((wall, index) => {
            return <div
                // key= {index}
                style={{
                    position: 'absolute',
                    boarder: '5px',
                    width: `${wall.width}px`,
                    height: `${wall.height}px`,
                    left: `${wall.x}px`,
                    top: `${wall.y}px`,
                    background: `url(${Wall1})`,
                }}
            ></div>
        })
    }


    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: `0px`,
                    left: `0px`,
                }}>
                {this.makeWallImageGrid()}
            </div>
        )
    }
}
