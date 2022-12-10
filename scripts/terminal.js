// Importing required files
import fs from 'fs';
import CPU from '../classes/CPU.js';
import RomBuffer from '../classes/RomBuffer.js';
import terminalInterface from '../classes/terminalInterface.js';

// Loading ROM data
const fileContents = fs.readFileSync(process.argv.slice(2)[0])

// Initializing the terminal interface
const cpuInterface = new terminalInterface();
const cpu = new CPU(cpuInterface);
const romBuffer = new RomBuffer(fileContents);

cpu.load(romBuffer);

let timer = 0
function cycle() {
  timer++
  if (timer % 5 === 0) {
    cpu.tick()
    timer = 0
  }

  cpu.step()

  setTimeout(cycle, 3)
}

cycle()