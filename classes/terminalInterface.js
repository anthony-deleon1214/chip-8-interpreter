import CpuInterface from "./CpuInterface.js";
import blessed from "blessed";
import keyMap from "../data/keyMap.js";
import { COLOR, DISPLAY_HEIGHT, DISPLAY_WIDTH } from "../data/constants.js";

class terminalInterface extends CpuInterface {
    constructor() {
        super()
        this.frameBuffer = this.createFrameBuffer();
        this.screen = blessed.screen({ smartCSR: true });
        this.screen.title = 'Chip8.js';
        this.color = blessed.helpers.attrToBinary({ fg: COLOR });
        this.keys = 0;
        this.keyPressed = undefined;

        // Key Down Event
        this.screen.on('keypress', (_, key) => {
            const keyIndex = keyMap.indexOf(key.full);
            if (keyIndex > -1) {
                this._setKeys(keyIndex);
            }
        });

        // Emulating a key up event
        setInterval(() => {
            this._resetKeys()
        }, 100)

        // Sound not implemented
        this.soundEnabled = false;

        // Defining an exit method
        this.screen.key(['escape', 'C-c'], () => {
            process.exit(0);
        })
    };

    createFrameBuffer() {
        let frameBuffer = [];               // Initialize frameBuffer

        for (let i = 0; i < DISPLAY_WIDTH; i++) {      // Create arrays for each column
            frameBuffer.push([]);
            for (let j = 0; j < DISPLAY_HEIGHT; j++) {  // Place zeroes in frameBuffer arrays to represent rows
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
        // Checking for collision at specified coordinate, returning true if there is a collision
        let collision = this.frameBuffer[y][x] & value;
        this.frameBuffer[y][x] ^= value;

        if (this.frameBuffer[y][x] === 1) {
            this.screen.fillRegion(this.color, '█', x, x + 1, y, y + 1)
        } else {
            this.screen.clearRegion(x, x+1, y, y+1)
        }

        this.screen.render();

        return collision;
    };

    _getKeys() {
        return this.keys;
    }

    _setKeys(keyIndex) {
        let keyMask = 1 << keyIndex;
        this.keys = this.keys | keyMask;
        this.keyPressed = keyIndex;
    };

    _waitKey() {
        const keyPressed = this.keyPressed;
        this.keyPressed = undefined;

        return keyPressed;
    };

    _resetKeys() {
        this.keys = 0;
        this.keyPressed = undefined;
    };

    clearScreen() {
        this.frameBuffer = this.createFrameBuffer();
        this.screen.clearRegion(0, DISPLAY_WIDTH, 0, DISPLAY_HEIGHT)
        //this.screen.render();
    };
};

export default terminalInterface;