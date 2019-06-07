import React, { Component } from 'react'
import heart from '../images/misc/heart.png'
import hollow from '../images/misc/hollow.png'


export default class HealthBar extends Component {

    makeHeartImageRow = () => {
        let heartRow = []
        for (var x = 1; x <= 3; x += 1) {
            heartRow.push(<img
                key={heartRow.length}
                style={{
                    position: 'absolute',
                    width: '5%',
                    top: `50px`,
                    left: `${(x * 100) - 50}px`,
                }
                }
                src={this.props.health < x ? hollow : heart}
                alt='ground'
            />)
        }
        return heartRow
    }

    render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: `0px`,
                    left: `0px`,
                }}>
                {this.makeHeartImageRow()}
            </div>
        )
    }
}
