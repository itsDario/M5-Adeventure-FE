import React from 'react'
import Shopdoor from '../images/misc/castledoors.png'


export default class RoomDoor extends React.PureComponent {
    state = {
        displayDoor: true
    }

    displayDoor = () => {
        if (this.state.displayDoor) {
            console.log('shopdoorRender');

            return <img
                alt='Door'
                style={{
                    position: 'absolute',
                    top: `${window.innerHeight / 2}px`,
                    left: `${(window.innerWidth / 3) * 2}px`,
                    zIndex: 1,
                }}
                // src={`player` + `${this.props.playerInfo.direction}_1`}
                src={Shopdoor}
            ></img>
        } else {
            return <span></span>
        }
    }

    render() {
        return (
            <div>
                {this.displayDoor()}
            </div>
        )
    }
}
