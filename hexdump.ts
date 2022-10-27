// Takes in binary data and creates a hexdump
// Used to read in CHIP-8 ROMs

// Pull Node's filesystem API
const fs = require('node:fs');

// Grabbing filename from CLI arguments in Node
const filename = process.argv.slice(2)[0]

function hexdump(filename) {
    // Creating a readable data stream from a given file
    const readableStream = fs.createReadStream(filename);

    readableStream.on('error', function (error) {
        console.log(`error: ${error.message}`);
    })

    // Breaking file into chunks of data
    readableStream.on('data', (chunk) => {
        let lines = [];
        for (let i = 0; i < chunk.length; i += 16) {        // Breaking chunk into 16-byte lines
            let address = i.toString(16).padStart(8, 0);    // Storing an address value
            let block = chunk.slice(i, i + 16);
            let hexArray = [];                              // Creating separate hex and ASCII arrays
            let asciiArray = [];
            
            for (let value of block) {
                hexArray.push(value.toString(16).padStart(2, '0'));
                asciiArray.push(
                    value >= 0x20 && value < 0x7f ? String.fromCharCode(value) : '.' // Creating strings from desired ASCII character codes
                );
            };

            let hexString = hexArray.join(' ');
            let asciiString = asciiArray.join(' ');

            lines.push(`${address}  ${hexString}    |${asciiString}|`); // Formatting for individual lines
        };
        console.log(lines)
    });
};

console.log(hexdump(filename));