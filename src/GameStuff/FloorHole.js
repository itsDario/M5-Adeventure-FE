import React from 'react'
import hole from '../images/misc/hole.png';


export default class FloorHole extends React.PureComponent {
    state = {
        displayDoor: true
    }

    displayDoor = () => {
        if (this.state.displayDoor) {
            return <img
                alt='Door'
                style={{
                    marginTop: `${window.innerHeight / 2}px`,
                    marginLeft: `${window.innerWidth / 3}px`,
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
            <div>
                {this.displayDoor()}
            </div>
        )
    }
}
