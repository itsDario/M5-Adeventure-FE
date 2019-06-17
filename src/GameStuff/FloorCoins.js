import React from 'react'
import coinPic from '../images/misc/coin.png';

export default class FloorCoins extends React.PureComponent {

    renderCoins = () => {
        return this.props.coinArr.map((coin, i) => {
            return <img key={i} alt='coin' src={coinPic}
                style={{
                    width: '32px',
                    height: '32px',
                    position: 'absolute',
                    color: 'green',
                    top: `${coin.y}px`,
                    left: `${coin.x}px`,
                }}
            ></img>
        })
    }

    render() {
        return (
            <div>
                {this.renderCoins()}
            </div>
        )
    }
}
