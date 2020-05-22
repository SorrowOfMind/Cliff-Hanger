import 'phaser';
import './src/style/main.css';
import gameConfig from './src/config/gameConfig';
import {resize} from "./src/utils/functions";

let game;
let playerName = '';

window.addEventListener('load', function() {
    const initialScreen = document.querySelector('.initial-screen');
    const input = document.getElementById('playerName');
    input.addEventListener('keydown', function(e) {
        if (e.keyCode === 13 && input.value) {
            playerName = input.value;
            game = new Phaser.Game(gameConfig);
            resize();
            window.addEventListener('resize', resize, false);
            initialScreen.classList.add('hide');
        }
        return playerName;
    });
});

export {playerName};
