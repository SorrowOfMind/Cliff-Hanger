import {random} from '../utils/functions';

const platform = {
    speed: 200,
    spawn: [90,300],
    type: ['rocky', 'grassy', 'rooty', 'small'],
    yInitial: 200,
    yRange: [50, 250],
    gapRange: [50, 200],
    scaleRange: [1.1, 1.3],
    verticalLimit: [0.3, 0.8],

    choosePlatformType() {
        let idx = random(0, this.type.length);
        return this.type[idx];
    }
}

export default platform;