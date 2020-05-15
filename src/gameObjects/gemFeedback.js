class gemFeedback extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y) {
        super(scene,x,y,'gem-feedback');
        scene.add.existing(this);
        this.anims.play("gem-feedback");
        this.gemSound = scene.sound.add('gem-sound');
        this.gemSound.play();
    }
}

export default gemFeedback;