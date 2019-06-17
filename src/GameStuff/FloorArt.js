import React from 'react'
// import Ground1 from '../images/floor/rockyGround.png'
import Ground1 from '../images/floor/grass03.png'
// import Ground2 from '../images/floor/grassGround.png'
// import Ground3 from '../images/floor/waterGround.png'

export default class FloorArt extends React.PureComponent {

    makeFloorImageGrid = () => {

        this.floorArr = {
            'g1': Ground1,
            // 'g2': Ground2,
            // 'g3': Ground3,
        }

        let tileGrid = []
        for (var x = 0; x <= 3; x += 1) {
            for (var y = 0; y <= 1; y += 1) {
                tileGrid.push(<img
                    key={tileGrid.length}
                    style={{
                        position: 'absolute',
                        // width: '12%',
                        // top: `${y * 169}px`,
                        // left: `${x * 169}px`,
                        top: `${y * 512}px`,
                        left: `${x * 512}px`,
                    }
                    }
                    // Math.floor(Math.random() * 1) + 1 //old random tiles
                    src={this.floorArr[`g${this.props.floor % 2}`]}
                    alt='ground'
                />)
            }
        }
        return tileGrid
    }

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: `0px`,
                    left: `0px`,
                    background: `url(${Ground1})`,
                    zIndex: -1
                }}>
                {/* {this.makeFloorImageGrid()} */}
            </div>
        )
    }
}
