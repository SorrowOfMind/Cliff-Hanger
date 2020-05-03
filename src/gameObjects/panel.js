const panel = {
    color: 0x003939,

    drawPanel(scene) {
        let graphics = scene.add.graphics();
        graphics.fillStyle(this.color, 1);
        graphics.setAlpha(0.3);
        graphics.beginPath();

        graphics.moveTo(10,10);
        graphics.lineTo(200, 10);
        graphics.lineTo(200, 70);
        graphics.lineTo(10,70);

        graphics.closePath();
        graphics.fillPath();
    }
}

export default panel;