import React, { Component } from 'react'
import Player from "./Player";
import EnemiesGenerator from "./EnemiesGenerator";
import FloorArt from './FloorArt';
import WallArt from './WallArt';
import FloorEggs from './FloorEggs';
import RoomDoor from './RoomDoor';
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
                attacking: false,
            },
            enemies: [
            ],
            groundEggs: [
            ],
            walls: [
                { id: 0, x: 0, y: 0, width: 80, height: window.innerHeight },//leftwall
                { id: 1, x: window.innerWidth - 80, y: 0, width: 80, height: window.innerHeight },//rightwall
                { id: 2, x: 0, y: 0, width: window.innerWidth, height: 80 },//top wall
                { id: 3, x: 0, y: window.innerHeight - 80, width: window.innerWidth, height: 80 },//bottom wall
            ],
            floor: 1,
            eggs: 0,
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

    nextLevel = (level) => {
        this.setState({
            floor: level
        })
    }

    useEgg = () => {
        // this.state.eggs > 0 && 
        // eggs: prevState.eggs - 1,
        if (this.state.player.health < 3) {
            this.setState(prevState => ({
                player: {
                    ...prevState.player,
                    health: prevState.player.health + 1,
                }
            }))
        }
    }

    spawnFloorEgg = (enemy) => {
        let egg = enemy
        let chance = Math.floor(Math.random() * 5)
        if (chance < 2) {
            egg.id = Math.floor(Math.random() * 99999)
            egg.width = 25
            egg.height = 25
            this.setState(prevState => ({
                groundEggs: [...prevState.groundEggs, egg]
            }))
            console.log(this.state.groundEggs);

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

    newMonster = (enes) => {//x, y

        this.setState({
            enemies: enes
        })
    }

    checkPlayerEnemyCollisions = () => {
        this.checkEggCollisions()
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

    checkEggCollisions = () => {
        this.state.groundEggs.forEach(egg => {
            if (this.isColliding(egg, this.state.player)) {
                this.useEgg()//temp till more mechanics
                // eggs: prevState.eggs + 1,
                this.setState(prevState => ({
                    groundEggs: prevState.groundEggs.filter(oldEgg => oldEgg.id !== egg.id)
                }))
            }
        })
    }

    checkPlayerSwordHits = () => {
        this.state.enemies.forEach((enemy, index) => {

            if (this.isColliding(enemy, this.swordOffSet(this.state.player))) {
                this.setState(prevState => ({
                    enemies: prevState.enemies.filter(oldEnemy => oldEnemy.id !== enemy.id),
                    coins: prevState.coins + 1,
                }))
                this.spawnFloorEgg(enemy)
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
        return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        );
    }

    render() {
        return (
            <div classID='gameBody'>
                <FloorArt floor={this.state.floor} />
                <WallArt wallArea={this.state.walls} />
                <RoomDoor />
                <Player
                    useEgg={this.useEgg}
                    resetState={this.resetPlayer}
                    playerInfo={this.state.player}
                    returnInfo={this.setPlayerInfo}
                    attack={this.checkPlayerSwordHits}
                    swordOffSet={this.swordOffSet} />
                <EnemiesGenerator
                    newMonster={this.newMonster}
                    returnInfo={this.setMonsterInfo}
                    enemies={this.state.enemies}
                    floor={this.state.floor}
                    nextFloor={this.nextLevel}
                />
                <FloorEggs eggArr={this.state.groundEggs} />
                {/* <HeldEggs eggs={this.state.eggs} /> */}
                <HealthBar health={this.state.player.health} />
            </div >
        )
    }
}