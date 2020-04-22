import 'phaser';
import './style/main.css';
import gameConfig from './config/gameConfig';



window.addEventListener('load', function() {
    new Phaser.Game(gameConfig);
});