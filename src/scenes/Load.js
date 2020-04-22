import sky from "../assets/images/sky.png";
import clouds from "../assets/images/clouds.png";
import sea from "../assets/images/sea.png";
import farGrounds from "../assets/images/far-grounds.png";

export default class Load extends Phaser.Scene {
    constructor() {
        super({
            key: 'load'
        });
    }

    preload() {
        this.load.image("sky", sky);
        this.load.image("clouds", clouds);
        this.load.image("sea", sea);
        this.load.image("farGrounds", farGrounds);
      
    }

    create() {
        this.scene.start('gameplay');
    }
}