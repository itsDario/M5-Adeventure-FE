import React, { Component } from 'react'
import Player from "./Player";
import EnemiesGenerator from "./EnemiesGenerator";

export default class GameContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            player: {
                x: 500,
                y: 500,
                health: 3,
                lastHit: Date.now(),
                direction: 'up',
                swordSize: 50,
                attacking: false
            },
            enemies: [{ id: 0, x: 400, y: 500 }, { id: 1, x: 400, y: 600 }],
        }
    }
    resetState = () => {
        this.setState({
            player: {
                x: 500,
                y: 500,
                health: 3,
                lastHit: Date.now(),
                direction: 'up',
                swordSize: 50,
                attacking: false
            },
            enemies: [{ id: 0, x: 400, y: 500 }, { id: 1, x: 400, y: 600 }],
        })
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
        return { x, y }
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
        return !(
            ((a.y + 66) < (b.y)) ||
            (a.y > (b.y + 66)) ||
            ((a.x + 66) < b.x) ||
            (a.x > (b.x + 66))
        );
    }

    render() {
        return (
            <div
                classID='gameBody'
            >
                <Player resetState={this.resetPlayer} playerInfo={this.state.player} returnInfo={this.setPlayerInfo} attack={this.checkPlayerSwordHits} />
                <EnemiesGenerator enemies={this.state.enemies} />
            </div >
        )
    }
}