// Importing required files
import 'fs';
import CPU from '../classes/CPU';
import RomBuffer from '../classes/RomBuffer';
import terminalInterface from '../classes/terminalInterface';

// Loading ROM data
const fileContents = fs.readFileSync(process.argv.slice(2)[0])

// Initializing the terminal interface
