import gameConfig from "../config/gameConfig";
import scoreHandler from "../gameObjects/score";
import fadeAway from "../utils/fadeAway";

export default class Leaderboard extends Phaser.Scene {
    constructor() {
        super({
            key: 'leaderboard'
        });
        this.scores = [],
        this.url = 'http://localhost:3000',
        this.posX = gameConfig.width/2,
        this.posY = gameConfig.height/2
    }

    create() {
        fetch(`${this.url}/records`).then(res => res.json()).then(data => {
            this.scores = data
            this.scores.sort((x, y) => y.score - x.score);
            console.log(this.scores)
            for (let i = 1; i < 6; i++) {
                if (this.scores[i-1]) {
                    if (i === 1) {
                        this.add.bitmapText(this.posX - 155, this.posY - 70 + i*30, 'pxlFont', `    ${i}                   ${scoreHandler.addZeros(this.scores[i-1].score, 6)}              ${this.scores[i-1].name}`, 26);
                    } else {
                        this.add.bitmapText(this.posX - 155, this.posY - 70 + i*30, 'pxlFont', `    ${i}                  ${scoreHandler.addZeros(this.scores[i-1].score, 6)}              ${this.scores[i-1].name}`, 26);
                    }
                } else {
                    this.add.bitmapText(this.posX - 155, this.posY - 70 + i*30, 'pxlfont', `    ${i}                   0               ---`, 26);
                }
            }
        });

        this.menu = this.add.tileSprite(0,0,0,0,'menu').setOrigin(0,0);
        this.gameOver = this.add.image(this.posX, this.posY, 'game-over').setScale(1.2);

        this.leaderboardSign = this.add.bitmapText(this.posX - 90, this.posY - 180,'pxlFont', 'LEADERBOARD', 40);

        this.scoreSign = this.add.bitmapText(this.posX - 100,this.posY - 130,'pxlFont', `YOUR SCORE: ${scoreHandler.addZeros(scoreHandler.score,6)}`, 28);

        this.add.bitmapText(this.posX - 160, this.posY - 90, 'pxlFont', 'RANK          SCORE          NAME', 32);
       
        this.icon = this.add.sprite(this.posX, this.posY,'player');
        this.icon.setScale(1.5);
        this.icon.setVisible(false);

        this.playAgainSign = this.add.image(this.posX, this.posY + 170,'play-again');
        this.playAgainSign.setScale(0.3);
        this.playAgainSign.setInteractive();

        fadeAway(this);

        this.playAgainSign.on('pointerover', () => {
            this.icon.setVisible(true);
            this.icon.anims.play('run');
            this.icon.x = this.playAgainSign.x - 130;
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