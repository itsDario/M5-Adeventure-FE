import React from 'react'
import Slime from "./Slime"


export default class EnemiesGenerator extends React.PureComponent {

    componentDidMount() {
        // this.generateEnemies()
    }

    componentWillUpdate(prevProps, prevState) {
        // if (this.props.enemies < 1) {
        // console.log('eGen', this.props.floor);

        if (this.props.startNewLevel()) {
            this.generateEnemies()
            this.props.nextFloor(this.props.floor + 1)
        }
    }

    generateEnemies = () => {
        let enes = []
        for (let i = 0; i < (this.props.floor); i++) {
            let random = Math.floor(Math.random() * 4)

            if (random === 0) {
                enes.push({ id: i, x: window.innerWidth / 4, y: window.innerHeight / 4, width: 85, height: 75, direction: 'up' })
            } else if (random === 1) {
                enes.push({ id: i, x: window.innerWidth / 4 * 3, y: window.innerHeight / 4, width: 85, height: 75, direction: 'up' })
            } else if (random === 2) {
                enes.push({ id: i, x: window.innerWidth / 4, y: window.innerHeight / 4 * 3, width: 85, height: 75, direction: 'up' })
            } else {
                enes.push({ id: i, x: window.innerWidth / 4 * 3, y: window.innerHeight / 4 * 3, width: 85, height: 75, direction: 'up' })
            }
        }
        this.props.newMonster(enes)
    }


    renderEnemies = () => {
        return this.props.enemies.map((ene) => {
            // console.log(ene);
            return <Slime
                returnInfo={this.props.returnInfo}
                location={ene}
                key={ene.id}
            />
        });
    }

    render() {
        return (
            <div>
                {this.renderEnemies()}
            </div>
        )
    }
}
