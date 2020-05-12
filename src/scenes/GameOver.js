import gameConfig from "../config/gameConfig";
import scoreHandler from "../gameObjects/score";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameOver'
        });
    }

    create() {
        this.menu = this.add.tileSprite(0,0,0,0,'menu').setOrigin(0,0);
        this.gameOver = this.add.image(gameConfig.width/2,gameConfig.height/2, 'game-over');

        this.gameOverSign = this.add.bitmapText(gameConfig.width/2-105,gameConfig.height/2 - 160,'pxlFont', 'GAME OVER', 64);
        this.gameOverSign.tint = 0xf27b22;

        this.scoreSign = this.add.bitmapText(gameConfig.width/2-163,gameConfig.height/2 - 80,'pxlFont', `TOTAL SCORE: ${scoreHandler.addZeros(scoreHandler.score,6)}`, 44);
        this.scoreSign.tint = 0xf27b22;

        // this.icon = this.add.image(gameConfig.width/2,gameConfig.height/2,'small');
        // this.icon.setVisible(false);

        this.icon = this.add.sprite(gameConfig.width/2,gameConfig.height/2,'player');
        this.icon.setScale(2);
        this.icon.setVisible(false);

        this.playAgainSign = this.add.image(gameConfig.width/2,gameConfig.height/2 + 125,'play-again');
        this.playAgainSign.setScale(0.5);
        this.playAgainSign.setInteractive();

        this.playAgainSign.on('pointerover', () => {
            this.icon.setVisible(true);
            this.icon.anims.play('run');
            this.icon.x = this.playAgainSign.x - 170;
            this.icon.y = this.playAgainSign.y;
        },this);

        this.playAgainSign.on('pointerout', () => {
            this.icon.setVisible(false);
        },this);

        this.playAgainSign.on("pointerdown", () => {
            this.scene.start('gameplay');
        });

       
    }

    update() {
        this.menu.tilePositionX += 0.6;
    }
    
}