import Load from '../scenes/Load';
import GamePlay from '../scenes/GamePlay';
import Menu from '../scenes/Menu';
import GameOver from '../scenes/GameOver';
import Leaderboard from '../scenes/Leaderboard';


const gameConfig = {
    type: Phaser.AUTO,
    width: 1350,
    height: 650,
    scene: [Load, Menu, GamePlay, GameOver, Leaderboard],
    backgroundColor: 0x171717,
    pixelArt: true,
    physics: {
        default: 'arcade',
        // arcade: {debug: true}
    }
}

export default gameConfig;