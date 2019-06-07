import React, { Component } from 'react'
import Slime from "./Slime"


export default class EnemiesGenerator extends Component {

    componentDidMount() {

    }

    renderEnemies = () => {
        return this.props.enemies.map((ene, index) => {
            // console.log(ene);
            return <Slime returnInfo={this.props.returnInfo} location={ene} key={index} />
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
