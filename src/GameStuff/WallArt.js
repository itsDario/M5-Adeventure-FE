import React from 'react'
import Wall0 from '../images/walls/spr_wood_1.png'
import Wall1 from '../images/walls/brickWall.png'
import Wall2 from '../images/walls/bricks2.png'



export default class WallArt extends React.PureComponent {

    state = {
    }

    makeWallImageGrid = () => {

        this.wallArr = {
            'w0': Wall0,
            'w1': Wall1,
            'w2': Wall2,
        }
        this.randomWall = Math.floor(Math.random() * Object.keys(this.wallArr).length)
        return this.props.wallArea.map((wall, index) => {
            return <div
                key={index}
                style={{
                    position: 'absolute',
                    boarder: '5px',
                    width: `${wall.width}px`,
                    height: `${wall.height}px`,
                    left: `${wall.x}px`,
                    top: `${wall.y}px`,
                    background: `url(${this.wallArr[`w${this.randomWall}`]})`,
                }}
            ></div>
        })
    }

    render() {
        console.log('renderWalls');

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
