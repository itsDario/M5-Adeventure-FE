import React, { Component } from 'react'
import door from '../images/misc/castledoors.png';


export default class RoomDoor extends Component {
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
                src={door}
            ></img>
        } else {
            return <span></span>
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.displayDoor !== this.state.displayDoor) {
            this.setState({
                displayDoor: this.props.displayDoor
            })
            return true
        } else {
            return false
        }
    }

    render() {
        console.log('doorRender');

        return (
            <div>
                {this.displayDoor()}
            </div>
        )
    }
}
