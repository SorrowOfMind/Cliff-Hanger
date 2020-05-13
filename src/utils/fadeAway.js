import gameConfig from "../config/gameConfig";

export default function fadeAway(scene) {
    let graphics = scene.add.graphics();
    graphics.fillStyle(0x171717, 1);
    graphics.setAlpha(0);
    return graphics.fillRect(0,0,gameConfig.width, gameConfig.height);
}