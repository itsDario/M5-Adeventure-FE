import React, { Component } from 'react'
import slimeup_1 from '../images/slime/up1.png';
import slimeup_2 from '../images/slime/up2.png';
import slimeup_3 from '../images/slime/up3.png';
import slimedown_1 from '../images/slime/down1.png';
import slimedown_2 from '../images/slime/down2.png';
import slimedown_3 from '../images/slime/down3.png';
import slimeleft_1 from '../images/slime/left1.png';
import slimeleft_2 from '../images/slime/left2.png';
import slimeleft_3 from '../images/slime/left3.png';
import slimeright_1 from '../images/slime/right1.png';
import slimeright_2 from '../images/slime/right2.png';
import slimeright_3 from '../images/slime/right3.png';

export default class Slime extends Component {

    componentDidMount() {
        this.intervalIDSprite = setInterval(this.updateSlimeSprite, 400);
        this.intervalIDDirection = setInterval(this.updateSlimeDirection, 400);
        this.intervalIDUpdate = setInterval(this.updateSlime, 20);
        this.stepFrame = 1
        this.direction = this.randomDirection()
    }

    componentWillUnmount() {
        clearInterval(this.intervalIDSprite);
        clearInterval(this.intervalIDDirection);
        clearInterval(this.intervalIDUpdate, 20);

    }

    randomDirection = () => {
        let newDirection = Math.floor(Math.random() * 4)
        // console.log(newDirection)
        switch (newDirection) {
            case 0:
                return 'up'
            case 1:
                return 'down'
            case 2:
                return 'left'
            case 3:
                return 'right'
            default:
                break;
        }
    }

    updateSlimeSprite = () => {
        this.stepFrame += 1
        if (this.stepFrame > 3) {
            this.stepFrame = 1
        }
    }

    updateSlimeDirection = () => {
        let directionChangeChance = Math.floor(Math.random() * 2)
        // console.log(directionChangeChance)
        if (directionChangeChance === 1) {
            this.direction = this.randomDirection()
        }
    }

    updateSlime = () => {
        // console.log(this.props.location.x);

        let x = 0
        let y = 0
        switch (this.direction) {
            case 'up':
                y -= 5
                break;
            case 'down':
                y += 5
                break;
            case 'left':
                x -= 5
                break;
            case 'right':
                x += 5
                break;

            default:
                break;
        }

        let direction = this.direction
        x += this.props.location.x
        y += this.props.location.y

        this.props.returnInfo({ ...this.props.location, x, y, direction })
    }

    render() {
        const slimeImages = {
            'up1': slimeup_1,
            'up2': slimeup_2,
            'up3': slimeup_3,
            'down1': slimedown_1,
            'down2': slimedown_2,
            'down3': slimedown_3,
            'right1': slimeright_1,
            'right2': slimeright_2,
            'right3': slimeright_3,
            'left1': slimeleft_1,
            'left2': slimeleft_2,
            'left3': slimeleft_3,
        }
        return (
            <div
                style={{
                    width: '128px',
                    height: '128px',
                    position: 'absolute',
                    color: 'green',
                    top: `${this.props.location.y}px`,
                    left: `${this.props.location.x}px`,
                }}
            >
                <img
                    alt='S'
                    src={slimeImages[`${this.direction}${this.stepFrame}`]}
                    className={'slime'}
                    style={{
                        width: '100%',
                        marginTop: '-30px',
                        marginLeft: '-20px',
                    }}
                />
            </div>
        )
    }
}
