import React, { Component } from 'react'
import Slime from "./Slime"


export default class EnemiesGenerator extends Component {

    componentDidMount() {
        this.generateEnemies()
    }

    componentWillUpdate(prevProps, prevState) {
        if (this.props.enemies < 1) {
            this.generateEnemies()
            this.props.nextFloor(this.props.floor + 1)
        }
    }


    generateEnemies = () => {
        let enes = []
        for (let i = 0; i < (this.props.floor); i++) {
            let random = Math.floor(Math.random() * 2)

            if (random === 0) {
                enes.push({ id: i, x: Math.floor((Math.random() * 500) + 200), y: 200, width: 85, height: 75, direction: 'up' })
            } else {
                enes.push({ id: i, x: Math.floor((Math.random() * 500) + 200), y: (window.innerHeight - 200), width: 85, height: 75, direction: 'up' })
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
