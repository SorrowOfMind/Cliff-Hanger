import gameConfig from '../config/gameConfig';
import player from "../gameObjects/player";
import platform from "../gameObjects/platforms";

import * as myFunct from '../utils/functions';

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

        //first long platform
        this.starterPlatform = this.physics.add.sprite(0, gameConfig.height - 240, 'starterPlatform').setOrigin(0,0);
        this.starterPlatform.setScale(2.5, 2.5);
        this.starterPlatformTop = this.physics.add.sprite(0, gameConfig.height - 300, 'starterPlatformTop').setOrigin(0,0);
        this.starterPlatformTop.setScale(2.5, 2.5);

        //starter platform group
        this.starterPlatformGroup = this.physics.add.group();
        this.starterPlatformGroup.add(this.starterPlatform);
        this.starterPlatform.setImmovable(true);

        //player
        this.player = this.physics.add.sprite(player.x, player.y, 'player');
        player.setPlayer(this.player);

        //starter platform - player collider
        this.starterPlatformCollider = this.physics.add.collider(this.player, this.starterPlatformGroup, () => {
            if (this.player.anims.getCurrentKey() === 'jump') {
                this.player.anims.play('run');
            }
        }, null, this);

        //floating platform group
        this.platformGroup = this.add.group({
            removeCallback: platform => platform.scene.platformPool.add(platform)
        });

        //floating platform pool
        this.platformPool = this.add.group({
            removeCallback: platform => platform.scene.platformGroup.add(platform)
        });

        //collider -> floating platforms vs player
        this.platformsCollider = this.physics.add.collider(this.player, this.platformGroup, () => {
            if (this.player.anims.getCurrentKey() === 'jump') {
                this.player.anims.play('run');
                this.player.setVelocityX(platform.speed);
            }
        }, null, this);

        //input
        this.input.on("pointerdown", () => player.jump(this.player), this);
        
  
    }
    createPlatform(x,y,type,nthPlatform) {
        let customPlatform, gem, frog;

        if(this.platformPool.getLength()) {
           customPlatform = this.platformPool.getFirstNth(nthPlatform);
           customPlatform.x = x;
           customPlatform.y = y;
           customPlatform.active = true;
           customPlatform.setScale(myFunct.randomPrecision(platform.scaleRange[0], platform.scaleRange[1]));
           customPlatform.visible = true;

           this.platformPool.remove(customPlatform);
        } else {
            customPlatform = this.physics.add.sprite(x, y, type).setOrigin(0,0);
            customPlatform.body.setImmovable(true);
            customPlatform.body.setVelocityX(platform.speed * -1);
            customPlatform.setScale(myFunct.randomPrecision(platform.scaleRange[0], platform.scaleRange[1]));
            customPlatform.setDepth(1);
            this.platformGroup.add(customPlatform);
        }
    }

    update() {

        //move bg
        this.clouds.tilePositionX += 0.2;
        this.sea.tilePositionX += 0.5;
        this.ground.tilePositionX += 0.8;

        //move starter platform
        if (this.starterPlatform.x + this.starterPlatform.displayWidth < 0 && this.starterPlatformTop.x + this.starterPlatformTop.displayWidth < 0) {
            this.starterPlatformGroup.clear(true, true);
        } else {
            this.starterPlatform.setVelocityX(platform.speed * -1);
            this.starterPlatformTop.setVelocityX(platform.speed * -1);
        }

    }
}