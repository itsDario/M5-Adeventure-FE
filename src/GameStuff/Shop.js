import React from 'react'
import Dan from '../images/misc/Dan.png';
import Bubble from '../images/misc/speech.png';
import Table from '../images/misc/Table.png';
import Shopdoor from '../images/misc/castledoors.png'
import Egg from '../images/misc/egg.png'
import Upgrade from '../images/misc/SwordSizeUp.png'
import House from '../images/misc/house2x1.gif'


export class Shop extends React.PureComponent {
    componentDidMount() {
        //setDanWall
        this.props.setWalls([
            { id: 0, x: 0, y: 0, width: 80, height: window.innerHeight },//leftwall
            { id: 1, x: window.innerWidth - 80, y: 0, width: 80, height: window.innerHeight },//rightwall
            { id: 2, x: 0, y: 0, width: window.innerWidth, height: 80 },//top wall
            { id: 3, x: 0, y: window.innerHeight - 80, width: window.innerWidth, height: 80 },//bottom wall
            { id: 4, x: window.innerWidth / 4 + 50, y: 0, width: window.innerWidth / 2, height: 300 },//npc wall
            { id: 5, x: window.innerWidth / 2 - 100, y: 0, width: 300, height: 350 },//table wall
        ])
    }

    showUpgrade = () => {
        if (!this.props.showUpgrade) {
            return <img
                alt='WeaponUpgrade'
                src={Upgrade}
                style={{
                    position: 'absolute',
                    top: `${window.innerHeight / 2}px`,
                    left: `${window.innerWidth / 3}px`,
                    width: '100px',
                    height: '100px',
                }}>
            </img>
        }
    }

    showEgg = () => {
        if (!this.props.showEgg) {
            return <img
                alt='buyEgg'
                src={Egg}
                style={{
                    position: 'absolute',
                    top: `${window.innerHeight / 2}px`,
                    left: `${window.innerWidth / 2}px`,
                    width: '100px',
                    height: '100px',
                }}>
            </img>
        }
    }

    render() {
        return (
            <div>
                <img
                    alt='House'
                    src={House}
                    style={{
                        position: 'absolute',
                        top: `-90px`,
                        left: `${window.innerWidth / 2 - 143}px`,
                    }}>
                </img>
                <img
                    alt='shopNpc'
                    src={Dan}
                    style={{
                        position: 'absolute',
                        top: `${window.innerHeight / 6}px`,
                        left: `${window.innerWidth / 2}px`,
                    }}>
                </img>
                <img
                    alt='speech'
                    src={Bubble}
                    style={{
                        position: 'absolute',
                        top: `${window.innerHeight / 8}px`,
                        left: `${(window.innerWidth / 2) + 30}px`,
                    }}>
                </img>
                <img
                    alt='shopTable'
                    src={Table}
                    style={{
                        position: 'absolute',
                        width: '300px',
                        zIndex: 3,
                        top: `${(window.innerHeight / 6) + 110}px`,
                        left: `${window.innerWidth / 2 - 100}px`,
                    }}>
                </img>
                <img
                    alt='exitShop'
                    src={Shopdoor}
                    style={{
                        position: 'absolute',
                        top: `${(window.innerHeight / 6) * 4}px`,
                        left: `${window.innerWidth / 2}px`,
                    }}>
                </img>
                {this.showEgg()}
                {this.showUpgrade()}
            </div>
        )
    }
}

export default Shop
