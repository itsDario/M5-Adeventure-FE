import React, { Component } from 'react'
import Player from "./Player";
import EnemiesGenerator from "./EnemiesGenerator";
import FloorArt from './FloorArt';
import WallArt from './WallArt';
import HealthBar from './HealthBar';

export default class GameContainer extends Component {

    constructor(props) {
        super(props);
        this.defaultState = {
            player: {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                width: 80,
                height: 80,
                health: 3,
                lastHit: Date.now(),
                direction: 'up',
                swordSize: 30,
                attacking: false
            },
            enemies: [
                { id: 0, x: 200, y: 500, width: 85, height: 75, direction: 'up' },
                { id: 1, x: 800, y: 200, width: 85, height: 75, direction: 'up' },
                { id: 2, x: 100, y: 200, width: 85, height: 75, direction: 'up' },
                { id: 3, x: 800, y: 500, width: 85, height: 75, direction: 'up' },
            ],
            walls: [
                { id: 0, x: 0, y: 0, width: 80, height: window.innerHeight },//leftwall
                { id: 1, x: window.innerWidth - 80, y: 0, width: 80, height: window.innerHeight },//rightwall
                { id: 2, x: 0, y: 0, width: window.innerWidth, height: 80 },//top wall
                { id: 3, x: 0, y: window.innerHeight - 80, width: window.innerWidth, height: 80 },//bottom wall
            ]
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

    setPlayerInfo = (newPlayer) => {
        this.checkPlayerEnemyCollisions()

        let player = { ...this.state.player }
        player.x += newPlayer.x
        player.y -= newPlayer.y
        // console.log(!this.checkWallCollisions(player))
        if (!this.checkWallCollisions(player)) {
            this.setState(prevState => ({
                player: {
                    ...prevState.player,
                    x: prevState.player.x + newPlayer.x,
                    y: prevState.player.y - newPlayer.y,
                    direction: newPlayer.direction,
                }
            }))
        }
    }

    setMonsterInfo = (info) => {
        let newEnemies = this.state.enemies


        if (!this.checkWallCollisions(info)) {
            newEnemies = newEnemies.map(mon => (mon.id === info.id) ? info : mon)
            this.setState(prevState => ({
                enemies: newEnemies
            }))
        }
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
                if (this.state.player.health < 1) {
                    this.resetState()
                }
            }
        })
    }

    checkPlayerSwordHits = () => {
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

    checkWallCollisions = (object) => {
        let touching = false
        this.state.walls.forEach(wall => {
            if (this.isColliding(wall, object)) {
                touching = true
            }
        })
        return touching
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
                <FloorArt />
                <WallArt wallArea={this.state.walls} />
                <Player
                    resetState={this.resetPlayer}
                    playerInfo={this.state.player}
                    returnInfo={this.setPlayerInfo}
                    attack={this.checkPlayerSwordHits}
                    swordOffSet={this.swordOffSet} />
                <EnemiesGenerator returnInfo={this.setMonsterInfo} enemies={this.state.enemies} />
                <HealthBar health={this.state.player.health} />
            </div >
        )
    }
}