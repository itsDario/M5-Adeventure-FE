import React, { Component } from 'react'
import eggPic from '../images/misc/egg.png';

export default class FloorEggs extends Component {

    renderEggs = () => {
        return this.props.eggArr.map((egg, i) => {
            return <img key={i} alt='egg' src={eggPic}
                style={{
                    width: '32px',
                    height: '32px',
                    position: 'absolute',
                    color: 'green',
                    top: `${egg.y}px`,
                    left: `${egg.x}px`,
                }}
            ></img>
        })
    }

    render() {
        return (
            <div

            >
                {this.renderEggs()}
            </div>
        )
    }
}
