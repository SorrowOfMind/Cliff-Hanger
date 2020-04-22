import Load from '../scenes/Load';
import GamePlay from '../scenes/GamePlay';


const gameConfig = {
    type: Phaser.AUTO,
    width: 1350,
    height: 650,
    scene: [Load, GamePlay],
    backgroundColor: 0x0c88c7,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {debug: true}
    }
}

export default gameConfig;