import 'phaser';
import './style/main.css';
import gameConfig from './config/gameConfig';
import {resize} from "./utils/functions";

window.addEventListener('load', function() {
    let game = new Phaser.Game(gameConfig);

    resize();
    window.addEventListener('resize', resize, false);
});