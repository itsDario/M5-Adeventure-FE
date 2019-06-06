import React, { Component } from 'react'
import Player from "./Player";
import EnemiesGenerator from "./EnemiesGenerator";

export default class GameContainer extends Component {

    constructor(props) {
        super(props);
        this.defaultState = {
            player: {
                x: 500,
                y: 500,
                width: 100,
                height: 100,
                health: 3,
                lastHit: Date.now(),
                direction: 'up',
                swordSize: 30,
                attacking: false
            },
            enemies: [
                { id: 0, x: 200, y: 500, width: 64, height: 0, direction: 'up' },
                { id: 1, x: 800, y: 200, width: 64, height: 0, direction: 'up' }],
        }
        this.state = this.defaultState
    }
    resetState = () => {
        this.setState(this.defaultState)
    }

    swordOffSet = (player) => {
        let x = player.x
        let y = player.y
        switch (player.direction) {
            case 'up':
                y -= player.swordSize
                break;
            case 'down':
                y += player.swordSize
                break;
            case 'left':
                x -= player.swordSize
                break;
            case 'right':
                x += player.swordSize
                break;
            default:
                break;
        }

        return { ...player, x, y }
    }

    setPlayerInfo = (dir) => {
        this.checkPlayerEnemyCollisions()
        this.setState(prevState => ({
            player: {
                ...prevState.player,
                x: prevState.player.x + dir.x,
                y: prevState.player.y - dir.y,
                direction: dir.direction,
            }
        }))

    }

    checkPlayerEnemyCollisions = () => {
        this.state.enemies.forEach(enemy => {
            if (this.state.player.lastHit + 1000 < Date.now() && this.isColliding(enemy, this.state.player)) {
                this.setState(prevState => ({
                    player: {
                        ...prevState.player,
                        health: prevState.player.health - 1,
                        lastHit: Date.now()
                    }
                }))
                console.log(this.state.player.health);
                if (this.state.player.health < 1) {
                    this.resetState()
                }
            }
        })
    }

    checkPlayerSwordHits = () => {///inProgress
        this.state.enemies.forEach((enemy, index) => {
            // console.log(enemy);

            if (this.isColliding(enemy, this.swordOffSet(this.state.player))) {
                this.setState(prevState => ({
                    enemies: prevState.enemies.filter(oldEnemy => oldEnemy.id !== enemy.id)
                }))
                // console.log('attack hit');
            }
        })
    }

    isColliding = (a, b) => {
        // console.log((a.y + a.height) < (b.y))
        // console.log(a.y > (b.y + b.height))
        // console.log((a.x + a.width) < b.x)
        // console.log(a.x > (b.x + b.width))
        return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        );
    }

    render() {
        return (
            <div
                classID='gameBody'
            >
                <Player
                    resetState={this.resetPlayer}
                    playerInfo={this.state.player}
                    returnInfo={this.setPlayerInfo}
                    attack={this.checkPlayerSwordHits}
                    swordOffSet={this.swordOffSet} />
                <EnemiesGenerator enemies={this.state.enemies} />
            </div >
        )
    }
}