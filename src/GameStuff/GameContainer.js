import React from 'react'
import Player from "./Player";
import EnemiesGenerator from "./EnemiesGenerator";
import FloorArt from './FloorArt';
import WallArt from './WallArt';
import FloorCoins from './FloorCoins';
import FloorHole from './FloorHole';
import ShopDoor from './ShopDoor';
import HealthBar from './HealthBar';
import Shop from './Shop';
import HeldEggs from './HeldEggs'
import HeldMonies from './HeldMonies'

export default class GameContainer extends React.PureComponent {

    constructor(props) {
        super(props);
        this.defaultState = {
            player: {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                width: 80,
                height: 80,
                health: 3,
                lastHit: 0,
                direction: 'up',
                swordSize: 30,
                attacking: false,
            },
            enemies: [
            ],
            groundMonies: [
            ],
            walls: [
                { id: 0, x: 0, y: 0, width: 80, height: window.innerHeight },//leftwall
                { id: 1, x: window.innerWidth - 80, y: 0, width: 80, height: window.innerHeight },//rightwall
                { id: 2, x: 0, y: 0, width: window.innerWidth, height: 80 },//top wall
                { id: 3, x: 0, y: window.innerHeight - 80, width: window.innerWidth, height: 80 },//bottom wall
            ],
            floor: 1,
            monies: 5,
            eggs: 0,
            inShop: false,
            boughtEgg: false,
            boughtUpgrade: false,
        }
        this.state = this.defaultState
        this.swordPrice = 5
        this.eggPrice = 1
    }
    resetState = () => {

        this.setState(this.defaultState)
        console.log('resetState', this.state.floor);

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
        console.log('nextLevel');

        this.setState({
            floor: level,
            boughtEgg: false,
            boughtUpgrade: false,
        })
    }

    useEgg = () => {
        // this.state.eggs > 0 && 
        // swordSize: 30,
        if (this.state.player.health < 3 && this.state.eggs > 0) {
            this.setState(prevState => ({
                eggs: prevState.eggs - 1,
                player: {
                    ...prevState.player,
                    health: prevState.player.health + 1,
                }
            }))
        }
    }

    spawnFloorCoin = (enemy) => {
        let coin = enemy
        let chance = Math.floor(Math.random() * 3)
        if (chance < 2) {
            coin.id = Math.floor(Math.random() * 99999)
            coin.width = 25
            coin.height = 25
            this.setState(prevState => ({
                groundMonies: [...prevState.groundMonies, coin]
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

    setWalls = (newWalls) => {
        this.setState({
            walls: newWalls
        })
    }

    newMonster = (enes) => {//x, y

        this.setState({
            enemies: enes
        })
    }

    checkPlayerEnemyCollisions = () => {
        this.checkMoneyCollisions()
        this.checkShopDoor()
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

    checkShopDoor = () => {
        if (this.state.inShop) {
            let doorLoc = { x: window.innerWidth / 2, y: window.innerHeight / 3 * 2, width: 100, height: 100 }
            let eggLoc = { x: window.innerWidth / 2, y: window.innerHeight / 2, width: 100, height: 100 }
            let upgradeLoc = { x: window.innerWidth / 3, y: window.innerHeight / 2, width: 100, height: 100 }

            if (this.isColliding(this.state.player, doorLoc) && this.displayDoor()) {//exit
                console.log('Exited Shop', this.state.inShop);

                this.setState({
                    inShop: false,
                    walls: [
                        { id: 0, x: 0, y: 0, width: 80, height: window.innerHeight },//leftwall
                        { id: 1, x: window.innerWidth - 80, y: 0, width: 80, height: window.innerHeight },//rightwall
                        { id: 2, x: 0, y: 0, width: window.innerWidth, height: 80 },//top wall
                        { id: 3, x: 0, y: window.innerHeight - 80, width: window.innerWidth, height: 80 },//bottom wall
                    ]
                })
            }

            if (this.isColliding(this.state.player, eggLoc) && this.displayDoor() && !this.state.boughtEgg && this.state.monies >= this.eggPrice) {//egg

                this.setState(prevState => ({
                    monies: prevState.monies - this.eggPrice,
                    eggs: prevState.eggs + 1,//eggIncrease
                    boughtEgg: true
                }))
                console.log('BoughtEgg', this.state.monies);
            } else if (!this.isColliding(this.state.player, eggLoc)) {
                this.setState({
                    boughtEgg: false
                })
            }

            if (this.isColliding(this.state.player, upgradeLoc) && this.displayDoor() && !this.state.boughtUpgrade && this.state.monies >= this.swordPrice) {//upG

                this.setState(prevState => ({
                    player: {
                        ...prevState.player,
                        swordSize: prevState.player.swordSize + 20,//statIncrease
                    },
                    monies: prevState.monies - this.swordPrice,
                    boughtUpgrade: true
                }))
                console.log('Bought UpG', this.state.monies);
            }
        } else {
            let doorLoc = { x: (window.innerWidth / 3) * 2, y: window.innerHeight / 2, width: 100, height: 100 }

            if (this.isColliding(this.state.player, doorLoc) && this.displayDoor()) {
                console.log('Entered Shop', this.state.inShop);

                this.setState({
                    inShop: true
                })
            }
        }
    }

    checkMoneyCollisions = () => {//checkMoneyCollisions
        this.state.groundMonies.forEach(coin => {
            if (this.isColliding(coin, this.state.player)) {
                // this.useEgg()//temp till more mechanics
                this.setState(prevState => ({
                    monies: prevState.monies + 1,
                    groundMonies: prevState.groundMonies.filter(oldCoin => oldCoin.id !== coin.id)
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
                this.spawnFloorCoin(enemy)
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

    checkHoleCollision = () => {
        let doorLoc = { x: window.innerWidth / 3, y: window.innerHeight / 2, width: 100, height: 100 }

        if (this.isColliding(this.state.player, doorLoc) && this.displayDoor()) {
            return true
        } else {
            return false
        }
    }

    isColliding = (a, b) => {
        return !(
            ((a.y + a.height) < (b.y)) ||
            (a.y > (b.y + b.height)) ||
            ((a.x + a.width) < b.x) ||
            (a.x > (b.x + b.width))
        );
    }

    displayDoor = () => {
        if (this.state.enemies.length < 1) {
            return true
        } else {
            return false
        }
    }

    renderStage = () => {
        return (
            <div>
                <FloorArt
                    floor={this.state.floor}
                    inShop={this.state.inShop}
                />
                <WallArt
                    floor={this.state.floor}
                    setWalls={this.setWalls}
                    wallArea={this.state.walls}
                    inShop={this.state.inShop}
                />
                <HeldEggs eggs={this.state.eggs} />
                <ShopDoor
                    displayDoor={this.displayDoor()}
                    inShop={this.state.inShop}
                    monies={this.state.monies}
                />
                <HeldMonies monies={this.state.monies} />
                <Player
                    useEgg={this.useEgg}
                    resetState={this.resetPlayer}
                    playerInfo={this.state.player}
                    returnInfo={this.setPlayerInfo}
                    attack={this.checkPlayerSwordHits}
                    swordOffSet={this.swordOffSet}
                />
                <HealthBar health={this.state.player.health} />
            </div>
        )
    }

    render() {
        if (this.state.inShop) {
            return (
                <div>
                    {this.renderStage()}
                    <Shop
                        isColliding={this.isColliding}
                        player={this.state.player}
                        setWalls={this.setWalls}
                        showEgg={this.state.boughtEgg}
                        showUpgrade={this.state.boughtUpgrade}
                    />
                </div>
            )

        }
        else {
            return (
                <div classID='gameBody'>
                    <FloorHole displayDoor={this.displayDoor()} />
                    {this.renderStage()}
                    <EnemiesGenerator
                        newMonster={this.newMonster}
                        returnInfo={this.setMonsterInfo}
                        enemies={this.state.enemies}
                        floor={this.state.floor}
                        nextFloor={this.nextLevel}
                        startNewLevel={this.checkHoleCollision}
                    />
                    <FloorCoins coinArr={this.state.groundMonies} />
                </div >
            )
        }
    }
}