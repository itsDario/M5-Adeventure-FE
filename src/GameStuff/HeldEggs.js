import React, { Component } from 'react'
import eggPic from '../images/misc/egg.png';


export default class HeldEggs extends Component {
    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    width: '30%',
                    height: '10%',
                    bottom: `50px`,
                    left: `50px`,
                }
                }>
                <img
                    style={{
                        height: '100%',
                    }}
                    src={eggPic}
                    alt='egg'
                /> <span style={{ fontSize: '64px' }}>X {this.props.eggs}</span>
            </div>
        )
    }
}
