import sky from "../assets/images/sky.png";
import clouds from "../assets/images/clouds.png";
import sea from "../assets/images/sea.png";
import farGrounds from "../assets/images/far-grounds.png";
import starterPlatform from "../assets/images/starter-platform.png";
import starterPlatformTop from "../assets/images/starter-platform-top.png";
import player from "../assets/sprites/player.png";
import playerJSON from "../assets/sprites/player.json";
import rocky from "../assets/images/platform-rocky.png";
import grassy from "../assets/images/platform-grassy.png";
import rooty from "../assets/images/platform-rooty.png";
import small from "../assets/images/platform-small.png";

export default class Load extends Phaser.Scene {
    constructor() {
        super({
            key: 'load'
        });
    }

    preload() {
        
        //bg
        this.load.image("sky", sky);
        this.load.image("clouds", clouds);
        this.load.image("sea", sea);
        this.load.image("farGrounds", farGrounds);

        //first long platform
        this.load.image("starterPlatform", starterPlatform);
        this.load.image("starterPlatformTop", starterPlatformTop);

        //floating platforms
        this.load.image('rocky', rocky);
        this.load.image('grassy', grassy);
        this.load.image('rooty', rooty);
        this.load.image('small', small);

        //player
        this.load.atlas('player', player, playerJSON);
      
    }

    create() {

        this.anims.create ({
            key: 'run',
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 6,
                zeroPad: 0,
                prefix: 'run-',
                suffix: '.png'
            }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 2,
                zeroPad: 0,
                prefix: 'jump-',
                suffix: '.png'
            }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNames('player', {
                start: 1,
                end: 2,
                zeroPad: 0,
                prefix: 'hurt-',
                suffix: '.png'
            }),
            frameRate: 8,
            repeat: -1
        });

        this.scene.start('gameplay');
    }
}