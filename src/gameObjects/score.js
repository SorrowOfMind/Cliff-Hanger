const scoreHandler = {
    score: 0,

    incrementScore() {
        this.score += 10;
    },

    addZeros(score, size) {
        let scoreString = score.toString();
        while (scoreString.length < (size || 2)) {
            scoreString = `0${scoreString}`;
        }
        return scoreString;
    },

    drawScore(scene) {
        scene.score = scene.add.bitmapText(20,15,'pxlFont', 'SCORE: 000000', 34);
    }
}

export default scoreHandler;
