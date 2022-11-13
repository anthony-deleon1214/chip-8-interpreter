import CpuInterface from "./CpuInterface";
import blessed from "blessed";

class terminalInterface extends CpuInterface {
    constructor() {
        super()
        this.frameBuffer = this.createFrameBuffer();
        this.screen = blessed.screen({ smartCSR: true });
    };

    createFrameBuffer() {
        let frameBuffer = [];               // Initialize frameBuffer

        for (let i = 0; i < 32; i++) {      // Create arrays for each column
            frameBuffer.push([]);
            for (let j = 0; j < 64; j++) {  // Place zeroes in frameBuffer arrays to represent rows
                frameBuffer[i].push(0);
            }
        }
        return frameBuffer;                 // frameBuffer is all zeroes initially
    };

    /**
     * @param {number} x - Integer between 0 and 63, inclusive
     * @param {number} y - Integer between 0 and 31, inclusive
     * @param {number} value - 0 or 1, represents on or off for a given pixel
     * Updates a single pixel value in the frameBuffer
     */
    drawPixel(x, y, value) {
        this.frameBuffer[y][x] = value;

        if (this.frameBuffer[y][x] === 1) {
            this.screen.fillRegion(this.color, )
        } else {
            this.screen.clearRegion(x, x+1, y, y+1)
        }

        this.screen.render();
    };
}