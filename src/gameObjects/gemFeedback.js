class gemFeedback extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y) {
        super(scene,x,y,'gem-feedback');
        scene.add.existing(this);
        this.anims.play("gem-feedback");
    }
}

export default gemFeedback;