import React, { PureComponent } from 'react'
import coinPic from '../images/misc/coin.png';

export default class HeldMonies extends PureComponent {
    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: `150px`,
                    left: `50px`,
                }
                }>
                <img
                    style={{
                        height: '100%',
                    }}
                    src={coinPic}
                    alt='coin'
                /> <span style={{ fontSize: '32px', color: 'white' }}>X {this.props.monies}</span>
            </div>
        )
    }
}
