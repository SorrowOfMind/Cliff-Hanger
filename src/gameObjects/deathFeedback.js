class deathFeedback extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y) {
        super(scene,x,y,'death');
        scene.add.existing(this);
        this.anims.play("death");
    }
}

export default deathFeedback;