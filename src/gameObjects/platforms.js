import {random} from '../utils/functions';

const platform = {
    speed: 200,
    spawn: [90,300],
    type: ['rocky', 'grassy', 'rooty', 'small'],
    yInitial: 200,
    yRange: [50, 250],
    gapRange: [45, 210],
    scaleRange: [1.1, 1.3],
    verticalLimit: [0.25, 0.90],

    choosePlatformType() {
        let idx = random(0, this.type.length - 1);
        return this.type[idx];
    },

    speedUp() {
        this.speed += 5;
    }
}

export default platform;