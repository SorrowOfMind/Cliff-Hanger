import gameConfig from "../config/gameConfig";

export default class Load extends Phaser.Scene {
    constructor() {
        super({
            key: 'menu'
        });
    }

    create() {
        this.menu = this.add.tileSprite(0,0,0,0,'menu').setOrigin(0,0);
        this.title = this.add.image(gameConfig.width/2,150,'c');
        this.title.setScale(0.8);

        this.pressKeySign = this.add.bitmapText(gameConfig.width/2 - 95,280,'pxlFont', 'PRESS ANY KEY', 44);
        this.pressKeySign.tint = 0xf27b22;

        this.tweens.add({
            targets: this.pressKeySign,
            duration: 1000,
            alpha: {start: 1, to: 0},
            repeat: -1,
            yoyo: true
        })

        this.input.keyboard.on('keydown', this.startGameplay, this); 
      
    }
    
    startGameplay() {
        this.scene.start('gameplay');
    }

    update() {
        this.menu.tilePositionX += 0.6;
    }


}