import React, { Component } from 'react'
import playerImage from '../images/char.png';
import transparent from '../images/onepx.png';
import "../Player.css";

export default class Player extends Component {

    componentDidMount() {
        this.direction = 'up'
        this.left = false
        this.right = false
        this.up = false
        this.down = false
        this.attack = false
        this.playerSheet = new Image()
        this.playerSheet = "../images/cloakandleather.png"
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
        this.intervalID = setInterval(this.updateGame, 20);
        // document.getElementById('gameBody')
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleInputs)
        document.removeEventListener("keyup", this.handleKeyUp);
        clearInterval(this.intervalID);
    }


    handleKeyDown = (e) => {

        if (e.key === 'a' || e.key === 'ArrowLeft') {
            this.left = true
        }
        if (e.key === 'd' || e.key === 'ArrowRight') {
            this.right = true
        }
        if (e.key === 'w' || e.key === 'ArrowUp') {
            this.up = true
        }
        if (e.key === 's' || e.key === 'ArrowDown') {
            this.down = true
        }
        if (e.key === ' ') {
            this.attack = true
        }


    }

    handleKeyUp = (e) => {

        if (e.key === 'a' || e.key === 'ArrowLeft') {
            this.left = false
        }
        if (e.key === 'd' || e.key === 'ArrowRight') {
            this.right = false
        }
        if (e.key === 'w' || e.key === 'ArrowUp') {
            this.up = false
        }
        if (e.key === 's' || e.key === 'ArrowDown') {
            this.down = false
        }
    }

    updateGame = () => {
        let x = 0
        let y = 0
        if (this.left) {
            // this.setState(prevState => ({
            //     x: prevState.x - 5
            // }))
            x -= 5
            this.direction = 'left'
        }
        if (this.right) {
            x += 5
            this.direction = 'right'
        }
        if (this.up) {
            y += 5
            this.direction = 'up'
        }
        if (this.down) {
            y -= 5
            this.direction = 'down'
        }
        if (this.attack) {
            this.props.attack()
            this.attack = false
        }
        let direction = this.direction
        this.props.returnInfo({ x, y, direction })
    }

    render() {

        return (
            <img
                className='player'
                alt='O'
                src={transparent}
                style={{
                    position: 'absolute',
                    top: `${this.props.playerInfo.y}px`,
                    left: `${this.props.playerInfo.x}px`,
                    background: `url(${playerImage}) 0px,0px`,
                    backgroundSize: '880px',
                    backgroundPosition: '0px 0px',
                }
                }
            />

        )
    }
}
// AppRegistry.registerComponent('DisplayAnImage', () => DisplayAnImage);