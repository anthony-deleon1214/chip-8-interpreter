// Takes in binary data and creates a hexdump
// Used to read in CHIP-8 ROMs

// Pull Node's filesystem API
const fs = require('fs');

// Grabbing filename from CLI arguments in Node
const filename = process.argv.slice(2)[0]

