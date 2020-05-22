import gameConfig from "../config/gameConfig";
import scoreHandler from "../gameObjects/score";
import fadeAway from "../utils/fadeAway";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameOver'
        });
        this.posX = gameConfig.width/2,
        this.posY = gameConfig.height/2
    }

    create() {
        this.menu = this.add.tileSprite(0, 0, 0, 0, 'menu').setOrigin(0,0);
        this.gameOver = this.add.image(this.posX,this.posY, 'game-over');

        this.gameOverSign = this.add.bitmapText(this.posX - 105, this.posY - 160,'pxlFont', 'GAME OVER', 64);

        this.scoreSign = this.add.bitmapText(this.posX - 155, this.posY - 80,'pxlFont', `TOTAL SCORE: ${scoreHandler.addZeros(scoreHandler.score,6)}`, 44);

        this.icon = this.add.sprite(this.posX, this.posY, 'player');
        this.icon.setScale(2);
        this.icon.setVisible(false);

        this.gemIcon = this.add.sprite(this.posX, this.posY, 'gem');
        this.gemIcon.setScale(2);
        this.gemIcon.setVisible(false);

        this.leaderboardSign = this.add.bitmapText(this.posX - 150, this.posY, 'pxlFont', `CHECK LEADERBOARD`, 44).setTint(0xf27b22);
        this.leaderboardSign.setInteractive();

        this.playAgainSign = this.add.image(this.posX, this.posY + 125,'play-again');
        this.playAgainSign.setScale(0.5);
        this.playAgainSign.setInteractive();

        fadeAway(this);

        this.leaderboardSign.on('pointerover', () => {
            this.gemIcon.setVisible(true);
            this.gemIcon.anims.play('gem');
            this.gemIcon.x = this.leaderboardSign.x - 30;
            this.gemIcon.y = this.leaderboardSign.y + 13;
          
        });

        this.leaderboardSign.on('pointerout', () => {
            this.gemIcon.setVisible(false);
        });


        this.leaderboardSign.on('pointerdown', () => {
            this.leaderboardSound = this.sound.add('btn');
            this.leaderboardSound.play();
            this.tweens.add({
                targets: fadeAway(this),
                alpha: {from: 0, to: 1},
                ease: 'Linear',
                duration: 500,
                repeat: 0,
                yoyo: false,
                onComplete: () => {
                   this.scene.start('leaderboard');
                }
            });
        })

        this.playAgainSign.on('pointerover', () => {
            this.icon.setVisible(true);
            this.icon.anims.play('run');
            this.icon.x = this.playAgainSign.x - 170;
            this.icon.y = this.playAgainSign.y;
          
        });

        this.playAgainSign.on('pointerout', () => {
            this.icon.setVisible(false);
        });


        this.playAgainSign.on("pointerdown", () => {
            this.playAgainSound = this.sound.add('btn');
            this.playAgainSound.play();
            this.tweens.add({
                targets: fadeAway(this),
                alpha: {from: 0, to: 1},
                ease: 'Linear',
                duration: 500,
                repeat: 0,
                yoyo: false,
                onComplete: () => {
                   scoreHandler.score = 0;
                   this.scene.start('gameplay');
                }
            });
        });
    }
    
    update() {
        this.menu.tilePositionX += 0.6;
    }
    
}