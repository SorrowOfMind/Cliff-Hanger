import gameConfig from "../config/gameConfig";

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomPrecision = (min, max) => Math.random() * (max - min + 1) + min;

const resize = () => {
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = gameConfig.width / gameConfig.height;
    if(windowRatio < gameRatio){
        canvas.style.width = (windowWidth - 25) + "px";
        canvas.style.height = ((windowWidth - 25) / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
};

export {random, randomPrecision, resize};