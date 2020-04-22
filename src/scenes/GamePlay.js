import gameConfig from '../config/gameConfig';

export default class GamePlay extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameplay'
        });
    }

    create() {

        //sky
        this.sky = this.add.image(0, 0, 'sky').setOrigin(0, 0);
        this.sky.displayWidth = gameConfig.width;
        this.sky.displayHeight = gameConfig.height;

        //clouds
        this.clouds = this.add.tileSprite(0, gameConfig.height * 0.3, 0, 0, 'clouds').setOrigin(0, 0);
        this.clouds.displayHeight = this.clouds.height * 1.2;

        //sea
        this.sea = this.add.tileSprite(0, gameConfig.height - 200, gameConfig.width, gameConfig.height, 'sea').setOrigin(0,0);

        //far grounds
        this.ground = this.add.tileSprite(0, gameConfig.height - 220, gameConfig.width, gameConfig.height, 'farGrounds').setOrigin(0,0);
        this.ground.displayHeight = this.ground.height * 2;
        this.ground.displayWidth = this.ground.width * 2;
  
    }

    update() {

        this.clouds.tilePositionX += 0.2;
        this.sea.tilePositionX += 0.5;
        this.ground.tilePositionX += 0.8;
    }
}