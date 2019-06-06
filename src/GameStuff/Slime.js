import React, { Component } from 'react'
import slimeup_1 from '../images/slime/up1.png';
import slimeup_2 from '../images/player/movement/up2.png';
import slimeup_3 from '../images/player/movement/up3.png';
import slimedown_1 from '../images/player/movement/down1.png';
import slimedown_2 from '../images/player/movement/down2.png';
import slimedown_3 from '../images/player/movement/down3.png';
import slimeleft_1 from '../images/player/movement/left1.png';
import slimeleft_2 from '../images/player/movement/left2.png';
import slimeleft_3 from '../images/player/movement/left3.png';
import slimeright_1 from '../images/player/movement/right1.png';
import slimeright_2 from '../images/player/movement/right2.png';
import slimeright_3 from '../images/player/movement/right3.png';

export default class Slime extends Component {

    componentDidMount() {
        this.stepFrame = 1
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
                    src={slimeImages[`${this.props.location.direction}${this.stepFrame}`]}
                    className={'slime'}
                    style={{
                        width: '100%',
                    }}
                />
            </div>
        )
    }
}
