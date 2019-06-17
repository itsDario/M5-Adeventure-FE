import React from 'react'
import hole from '../images/misc/hole.png';


export default class FloorHole extends React.PureComponent {

    displayDoor = () => {
        if (this.props.displayDoor) {
            return <img
                alt='Door'
                style={{
                    position: 'absolute',
                    top: `${window.innerHeight / 2}px`,
                    left: `${window.innerWidth / 3}px`,
                    zIndex: 1,
                }}
                // src={`player` + `${this.props.playerInfo.direction}_1`}
                src={hole}
            ></img>
        } else {
            return <span></span>
        }
    }

    render() {
        console.log('holeRender');

        return (
            <span>
                {this.displayDoor()}
            </span>
        )
    }
}
