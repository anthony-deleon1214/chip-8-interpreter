import CpuInterface from "./classes/CpuInterface";
import blessed from "blessed";
import keyMap from "./keyMap";

class terminalInterface extends CpuInterface {
    constructor() {
        super()
        this.frameBuffer = this.createFrameBuffer();
        this.screen = blessed.screen({ smartCSR: true });
        this.keys = 0;
        this.keyPressed = undefined;

        this.screen.on('keypress', (_, key) => {
            const keyIndex = keyMap.indexOf(key.full);
            if (keyIndex > -1) {
                this._setKeys(keyIndex);
            }
        });

        // Sound not implemented
        this.soundEnabled = false;

        // Defining an exit method
        this.screen.key(['escape', 'C-c'], () => {
            process.exit(0);
        })
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

    _setKeys(keyIndex) {
        this.keys = keyIndex;
    };

    _waitKey() {
        const keyPressed = this.keyPressed;
        this.keyPressed = undefined;

        return keyPressed;
    };

    clearScreen() {
        this.frameBuffer = this.createFrameBuffer();

        this.screen.render();
    };
};

export default terminalInterface;