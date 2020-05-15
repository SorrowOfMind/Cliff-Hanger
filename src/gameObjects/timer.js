import platform from './platforms';

const timer = {
    initialTime: 0,
    timePanel: 'TIMER: 0:00',
    stopped: false,
    timer,

    setTimer(scene, callback) {
        this.timer = scene.time.addEvent({
            delay: 1000,
            callback: callback,
            callbackScope: scene,
            loop: true
        })
    },

    pauseTimer() {
        this.timer.paused = true;
    },

    formatTime(secs) {
        let mins = Math.floor(secs/60);
        let partInSec = secs%60;
        partInSec = partInSec.toString().padStart(2, '0');
        return `${mins}:${partInSec}`;
    },

    drawTimePanel(scene) {
        scene.timePanel = scene.add.bitmapText(20,40,'pxlFont', this.timePanel, 34);
    },

    startCounting(scene) {

        if (this.initialTime%30 === 0 && this.initialTime > 0) {
            platform.speedUp();
        }

        this.initialTime +=1;

        this.timePanel = `TIMER: ${this.formatTime(this.initialTime)}`
        scene.timePanel.text = this.timePanel;
    }
}

export default timer;