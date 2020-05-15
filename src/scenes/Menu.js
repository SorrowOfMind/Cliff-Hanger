import gameConfig from "../config/gameConfig";
import fadeAway from "../utils/fadeAway";

export default class Load extends Phaser.Scene {
    constructor() {
        super({
            key: 'menu'
        });
    }

    create() {
        this.menu = this.add.tileSprite(0,0,0,0,'menu').setOrigin(0,0);
        this.title = this.add.image(gameConfig.width/2,100,'c');
        this.title.setScale(0.8);

        this.pressKeySign = this.add.bitmapText(gameConfig.width/2 - 180,200,'pxlFont', 'PRESS ANY KEY TO START', 44);
        this.pressKeySign.tint = 0xf27b22;

        this.playBox = this.add.image(gameConfig.width/2,gameConfig.height/2 + 100, 'game-play');
        this.instruction = this.add.bitmapText(gameConfig.width/2 - 230, 415,'pxlFont', 'Use the right mouse key to jump/double jump.', 28);
        this.instruction.tint = 0xf27b22;

        fadeAway(this);

        this.tweens.add({
            targets: this.pressKeySign,
            duration: 1000,
            alpha: {start: 1, to: 0},
            repeat: -1,
            yoyo: true
        })

        // this.input.keyboard.on('keydown', this.startGameplay, this);
        this.input.keyboard.on('keydown', () => {
            this.pressKeySound = this.sound.add('btn');
            this.pressKeySound.play();
            this.tweens.add({
                targets: fadeAway(this),
                alpha: {from: 0, to: 1},
                ease: 'Linear',
                duration: 500,
                repeat: 0,
                yoyo: false,
                onComplete: () => {
                    this.startGameplay();
                }
            });
        }, this);
    }
    
    startGameplay() {
        this.scene.start('gameplay');
    }

    update() {
        this.menu.tilePositionX += 0.6;
    }


}