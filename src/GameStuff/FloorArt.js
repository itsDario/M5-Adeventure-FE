import React, { Component } from 'react'
import Ground1 from '../images/floor/rockyGround.png'
import Ground2 from '../images/floor/grassGround.png'
import Ground3 from '../images/floor/waterGround.png'

export default class FloorArt extends Component {

    state = {
    }

    makeFloorImageGrid = () => {

        this.floorArr = {
            'g1': Ground1,
            'g2': Ground2,
            'g3': Ground3,
        }

        let tileGrid = []
        for (var x = 0; x <= 10; x += 1) {
            for (var y = 0; y <= 10; y += 1) {
                tileGrid.push(<img
                    key={tileGrid.length}
                    style={{
                        position: 'absolute',
                        width: '12%',
                        top: `${y * 169}px`,
                        left: `${x * 169}px`,
                    }
                    }
                    src={this.floorArr[`g${Math.floor(Math.random() * 3) + 1}`]}
                    alt='ground'
                />)
            }
        }
        return tileGrid
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
                {this.makeFloorImageGrid()}
            </div>
        )
    }
}
