import sky from "../assets/images/sky.png";
import clouds from "../assets/images/clouds.png";
import sea from "../assets/images/sea.png";
import farGrounds from "../assets/images/far-grounds.png";

import menu from "../assets/images/menu.png";
import c from "../assets/images/name.png";

import starterPlatform from "../assets/images/starter-platform.png";
import starterPlatformTop from "../assets/images/starter-platform-top.png";

import player from "../assets/sprites/player.png";
import playerJSON from "../assets/sprites/player.json";

import rocky from "../assets/images/platform-rocky.png";
import grassy from "../assets/images/platform-grassy.png";
import rooty from "../assets/images/platform-rooty.png";
import small from "../assets/images/platform-small.png";

import gem from "../assets/sprites/gem.png";
import gemFeedback from "../assets/sprites/gem-feedback.png";

import death from "../assets/sprites/death.png";

import frog from "../assets/sprites/frog.png";

import pxlFont from "../assets/font/font.png";

export default class Load extends Phaser.Scene {
    constructor() {
        super({
            key: 'load'
        });
    }

    preload() {
        
        //menu screen
        this.load.image('menu', menu);
        this.load.image('c', c);
        
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

        //gem
        this.load.spritesheet('gem', gem, {
            frameWidth: 15,
            frameHeight: 13
        });

        this.load.spritesheet('gem-feedback', gemFeedback, {
            frameWidth: 34,
            frameHeight: 34
        });

        this.load.spritesheet('frog', frog, {
            frameWidth: 35,
            frameHeight: 21
        });

        this.load.spritesheet('death', death, {
            frameWidth: 56,
            frameHeight: 52
        });

        this.load.bitmapFont("pxlFont", pxlFont, "./font.xml");
      
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

        this.anims.create({
            key: 'gem',
            frames: this.anims.generateFrameNumbers('gem'),
            frameRate: 10,
            yoyo: true,
            repeat: -1
        });

        this.anims.create({
            key:'gem-feedback',
            frames: this.anims.generateFrameNumbers('gem-feedback'),
            frameRate: 8,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key:'death',
            frames: this.anims.generateFrameNumbers('death'),
            frameRate: 8,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: 'frog',
            frames: this.anims.generateFrameNumbers('frog'),
            frameRate: 4,
            repeat: -1,
            yoyo: true
        });

        this.scene.start('menu');
    }
}