const player = {
    x: 300,
    y: 300,
    gravity: 900,
    jumps: 0,
    allowedJumps: 2,
    dead: false,
    jumpPower: 432,

    setPlayer(player) {
        player.setGravityY(this.gravity);
        player.setScale(2);
        player.setCollideWorldBounds(false);
        player.anims.play('jump');
    },

    jump(player,scene) {
        if (!this.dead && player.body.touching.down || (this.jumps > 0 && this.jumps < this.allowedJumps)) {
            if (player.body.touching.down) {
                this.jumps = 0;
                player.setVelocityX(-3);
            }
            player.setVelocityY(this.jumpPower * -1);
            this.jumps++;
            player.anims.play('jump');
            this.jumpSound = scene.sound.add('jump-sound');
            this.jumpSound.play();
        }
    }
}

export default player;