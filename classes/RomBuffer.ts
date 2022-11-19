// Creating a class to convert raw binary into big-endian opcodes

interface RomBuffer {
    data: any;
};

class RomBuffer {
    /**
     * @param {binary}
     */

    constructor(fileContents) {
        this.data = [];

        const buffer = fileContents;

        // For loop to generate opcodes from fileContents
        for (let i=0; i < buffer.length; i+=2) {
            this.data.push((buffer[i] << 8) | (buffer[i+1] << 0))
        };
    };
}

export default RomBuffer;