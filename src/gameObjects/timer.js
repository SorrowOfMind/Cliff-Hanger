const timer = {
    intialTime: 0,
    timePanel: 'TIMER: 0:00',
    timer,

    setTimer(scene, callback) {
        this.timer = scene.time.addEvent({
            delay: 1000,
            callback: callback,
            callbackScope: scene,
            loop: true
        })
    },

    stopTimer() {
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
        // console.log(this.intialTime)
        // if (this.intialTime <= 0)  {
        //     this.initialTime = 150;
        // } else {
        //     this.intialTime +=1;
        // }
        
        this.intialTime +=1;

        this.timePanel = `TIMER: ${this.formatTime(this.intialTime)}`
        scene.timePanel.text = this.timePanel;
    }
}

export default timer;