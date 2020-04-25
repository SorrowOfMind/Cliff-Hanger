import gameConfig from '../config/gameConfig';
import player from "../gameObjects/player";
import platform from "../gameObjects/platforms";
import gem from "../gameObjects/gem";
import gemFeedback from '../gameObjects/gemFeedback';

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

        //group for active gems
        this.gemGroup = this.add.group({
            removeCallback: gem => gem.scene.gemPool.add(gem)
        });

        //pool for pending gems
        this.gemPool = this.add.group({
            removeCallback: gem => gem.scene.gemGroup.add(gem)
        });

        //gem vs player collider
        this.gemCollider = this.physics.add.overlap(this.player,this.gemGroup, (player,gem) => {
            this.tweens.add({
                targets: gem,
                alpha: 0,
                duration: 0,
                callbackScope: this,
                onComplete: () => {
                    new gemFeedback(this, 300, gem.y + 3);
                    // scoreManager.incrementScore();
                    // let scoreFormat = scoreManager.addZeros(scoreManager.score, 6);
                    // this.scorePanel.text = `SCORE: ${scoreFormat}`;
                    this.gemGroup.killAndHide(gem);
                    this.gemGroup.remove(gem);
                }
            });
        });
        

        //first floating platform
        this.createPlatform(gameConfig.width + 30, 400, platform.choosePlatformType(), myFunct.random(0, this.platformPool.getLength()));

        //input
        this.input.on("pointerdown", () => player.jump(this.player), this);
        
  
    }

    createPlatform(x,y,type,nthPlatform) {
        let customPlatform;
        let customGem;
        // let customFrog;

        if(this.platformPool.getLength() >=6) {
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

        if (myFunct.random(1,100) <= gem.gemChance) {
            if (this.gemPool.getLength()) {
                customGem = this.gemPool.getFirst();
                customGem.x = x + customPlatform.displayWidth/2;
                customGem.y = y - gem.gemHeight;
                customGem.setScale(gem.gemScale);
                customGem.setDepth(1);
                customGem.alpha = 1;
                customGem.active = true;
                customGem.visible = true;
                this.gemPool.remove(customGem);
            } else {
                customGem = this.physics.add.sprite(x + customPlatform.displayWidth/2, y - gem.gemHeight,'gem');
                customGem.setImmovable();
                customGem.setVelocityX(platform.speed * -1);
                customGem.setScale(gem.gemScale);
                customGem.setDepth(1);
                customGem.anims.play('gem');
                this.gemGroup.add(customGem);
            }
        }
    }

    spawnNextPlatform(mingap, gap) {
        if (mingap > gap) {
            let randomHeight = myFunct.random(platform.yRange[0], platform.yRange[1]);
            let nextPlatformY = platform.yInitial + randomHeight;
            let minY = gameConfig.height * platform.verticalLimit[0];
            let maxY = gameConfig.height * platform.verticalLimit[1];
            let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformY, minY, maxY);
            this.createPlatform(gameConfig.width + gap + myFunct.random(85,150), nextPlatformHeight, platform.choosePlatformType(), myFunct.random(0, this.platformPool.getLength()));
        }
    }

    update() {
        this.nextGap = myFunct.random(platform.gapRange[0], platform.gapRange[1]);
        let minGap = gameConfig.width;

        //move bg
        this.clouds.tilePositionX += 0.2;
        this.sea.tilePositionX += 0.5;
        this.ground.tilePositionX += 0.8;

              
        if (!this.player.body.touching.down) {
            this.player.setVelocityX(3);
        }

        //move starter platform
        if (this.starterPlatform.x + this.starterPlatform.displayWidth < 0 && this.starterPlatformTop.x + this.starterPlatformTop.displayWidth < 0) {
            this.starterPlatformGroup.clear(true, true);
        } else {
            this.starterPlatform.setVelocityX(platform.speed * -1);
            this.starterPlatformTop.setVelocityX(platform.speed * -1);
        }

        this.platformGroup.getChildren().forEach(platform => {
            let platformDistance = gameConfig.width - platform.x - platform.displayWidth;
            minGap = Math.min(minGap, platformDistance);
            if (platform.x + platform.displayWidth < 0) {
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);

        this.spawnNextPlatform(minGap, this.nextGap);

        this.gemGroup.getChildren().forEach(gem => {
            if (gem.x + gem.displayWidth < 0) {
                this.gemGroup.killAndHide(gem);
                this.gemGroup.remove(gem);
            }
        });

        // if (minGap > this.nextGap) {
        //     let randomHeight = myFunct.random(platform.yRange[0], platform.yRange[1]);
        //     let nextPlatformY = platform.yInitial + randomHeight;
        //     let minY = gameConfig.height * platform.verticalLimit[0];
        //     let maxY = gameConfig.height * platform.verticalLimit[1];
        //     let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformY, minY, maxY);
        //     this.createPlatform(gameConfig.width + this.nextGap + myFunct.random(50,120), nextPlatformHeight, platform.choosePlatformType(), myFunct.random(0, this.platformPool.getLength()));
        // }


    }
}