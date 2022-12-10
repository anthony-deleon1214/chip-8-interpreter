// Importing disassembler function
import disassemble from "./disassembler.js";
import terminalInterface from './terminalInterface.js';
import RomBuffer from './RomBuffer.js';
import fontSet from '../data/fontSet.js';

/*interface CPU {
    interface: terminalInterface;
    memory: Uint8Array,
    registers: Uint8Array,
    stack: Uint16Array,
    SP: number,
    PC: number,
    I: number,
    DT: number,
    ST: number,
    halted: boolean,
}; */

// Creating a CPU class
class CPU {
    // Take cpuInterface as constructor arg
    constructor(cpuInterface) {
        this.interface = cpuInterface;

        this.reset()
    }

    // Setting base values for the CPU
    reset() {
        this.memory = new Uint8Array(4096);
        this.registers = new Uint8Array(16);
        this.stack = new Uint16Array(16);
        this.SP = 0;       // Stack pointer (index in stack array)
        this.PC = 0x200;    // Program counter (instruction pointer)
        this.I = 0;         // Index register
        this.DT = 0;        // Delay timer
        this.ST = 0;        // Sound timer
        this.halted = true;
    };

    // Reading ROM into buffer
    load(romBuffer) {
        // Reset values to initial values when ROM is loaded
        this.reset()

        // Loading font data into memory
        for (let i = 0; i < fontSet.length; i++) {
            this.memory[i] = fontSet[i]
        }

        // Get romData from romBuffer
        const romData = romBuffer.data;
        let memoryStart = 0x200;

        this.halted = false;

        // Place romData into memory
        for (let i = 0; i < romData.length; i++) {
            // Loading the most significant bit into memory
            this.memory[memoryStart + 2 * i] = romData[i] >> 8;

            // Loading least significant bit into memory
            this.memory[memoryStart + 2 * i + 1] = romData[i] & 0x00FF;
        }
    };

    // Setting up a cycle function
    cycle() {
        this.step()

        setTimeout(this.cycle, 3);
    }

    // Laying out instruction cycle
    step() {
        const opcode = this._fetch();
        const instruction = this._decode(opcode);

        this._execute(instruction);
    }

    _fetch() {
        return this.memory[this.PC];
    };

    _decode(opcode) {
        return disassemble(opcode);
    };

    _nextInstruction() {
        // Move PC forward two bytes to next opcode
        this.PC = this.PC + 2
    };

    _skipInstruction() {
        // Move PC forward four bytes to skip next opcode
        this.PC = this.PC + 4
    };

    _execute(decodedInstruction) {
        // Destructure the object into id and arguments
        const { instruction, args } = decodedInstruction;
        switch(instruction.id) {
            case 'CLR':
                this.interface.clearScreen();
                this._nextInstruction();
                break;
            case 'RET': {
                // Assumes that required address is at current stack pointer
                this.PC = this.stack[this.SP];
                this.SP--;
                break;
            };
            case 'JP_ADDR': {
                // Does not store address before jump
                this.PC = (args[0]);
                break;
            };
            case 'CALL_ADDR': {
                // Pushing current address to stack
                this.stack.set([this.PC], this.SP);
                this.SP++;
                this.PC = args[0];
                break;
            };
            case 'SE_VX_NN': {
                if (this.registers[args[0]] === args[1]) {
                    this._skipInstruction();
                } else {
                    this._nextInstruction();
                };
                break;
            };
            case 'SNE_VX_NN': {
                if (this.registers[args[0]] !== args[1]) {
                    this._skipInstruction();
                } else {
                    this._nextInstruction();
                };
                break;
            };
            case 'SE_VX_VY': {
                if (this.registers[args[0]] === this.registers[args[1]]) {
                    this._skipInstruction();
                } else {
                    this._nextInstruction();
                };
                break;
            };
            case 'STO_NN_VX': {
                const targetRegister = args[0];
                const targetValue = args[1];
                this.registers.set([targetValue], targetRegister);
                break;
            };
            case 'ADD_NN_VX': {
                const targetRegister = args[0];
                const targetValue = args[1];
                this.registers.set([targetValue + this.registers[targetRegister]], targetRegister);
                break;
            };
            case 'STO_VY_VX': {
                const vxRegister = args[0];
                const vyRegisterValue = this.registers[args[1]];
                this.registers.set([vyRegisterValue], vxRegister);
                break;
            };
            case 'VX_OR_VY': {
                const result = (this.registers[args[0]] | this.registers[args[1]]);
                this.registers.set([result], args[0]);
                break;
            }; 
            case 'VX_AND_VY': {
                const result = (this.registers[args[0]] & this.registers[args[1]]);
                this.registers[args[0]] = result;
                break;
            };    
            case 'VX_XOR_VY': {
                const result = (this.registers[args[0]] ^ this.registers[args[1]]);
                this.registers[args[0]] = result;
                break;
            };
            case 'ADD_VY_VX': {
                const vxRegister = this.registers[args[0]];
                const vyRegister = this.registers[args[1]];
                let newValue = vxRegister + vyRegister;
                this.registers[args[0]] = newValue;
                break;
            };
            case 'SUB_VY_VX': {
                const vxRegister = this.registers[args[0]];
                const vyRegister = this.registers[args[1]];
                let newValue = vxRegister - vyRegister;
                this.registers[args[0]] = newValue;
                break;
            };
            case 'SHR_VY_VX': {
                const lsbMask = 0x01;
                const LSB = this.registers[args[1]] & lsbMask;
                this.registers.set([LSB], 0xF);
                this.registers.set([this.registers[args[1]] >> 1], this.registers[args[0]]);
                break;
            };
            case 'SUBN_VX_VY': {
                const vxRegister = this.registers[args[0]];
                const vyRegister = this.registers[args[1]];
                let newValue = vyRegister - vxRegister;
                this.registers[args[0]] = newValue;
                break;
            };
            case 'SHL_VY_VX': {
                const msbMask = 0x8000;
                const MSB = this.registers[args[1]] & msbMask;
                this.registers.set([MSB], 0xF);
                this.registers.set([this.registers[args[1]] << 1], this.registers[args[0]]);
            };
                break;
            case 'SNE_VX_VY': {
                const vxRegister = this.registers[args[0]];
                const vyRegister = this.registers[args[1]];
                if (vxRegister !== vyRegister) {
                    this._skipInstruction();
                };
                break;
            };
            case 'STO_NNN_I': {
                this.I = args[0];
                break;
            };
            case 'JMP_V0': {
                this.PC = (this.registers[0] + args[0]);
                break;
            };
            case 'RND_VX_NN': {
                let randNumber = Math.floor(Math.random() * 0xFF); // Generate random integer
                this.registers[args[0]] = randNumber & args[1];
                break;
            };
            case 'DRW_VX_VY_N': {
                // Checking that memory will be in bounds
                if (this.I > 4095 - args[2]) {
                    throw new Error('Memory out of bounds');
                };
                
                // 
                for (let i = 0; i < args[2]; i++) {
                    // Start getting data from memory at address I
                    // New line for each value of i
                    let line = this.memory[this.I + i];

                    for (let position = 0; position < 8; position++) {
                        // Iterate through each position in a line
                        // Checking value at each position using bitwise AND
                        let value = line & (1 << (7-position)) ? 1 : 0;
                        // Using modulo to ensure wrapping
                        let x = (this.registers[args[0]] + position) % 64;
                        let y = (this.registers[args[1]] + i) % 32;

                        if (this.interface.drawPixel(x, y, value)) {
                            // Setting VF register if a collision occurs when drawing pixels
                            this.registers[0xF] = 1;
                        };
                    }
                }
                break;
            };
            case 'SKP_VX': {
                // Bitshifting 1 left by the value in the VX register
                if ((1 << this.registers[args[0]]) === this.interface._getKeys()) {
                    this._skipInstruction();
                } else {
                    this._nextInstruction();
                };
                break;
            };
            case 'SKNP_VX': {
                // Bitshifting 1 left by the value in the VX register
                if (!((1 << this.registers[args[0]]) === this.interface._getKeys())) {
                    this._skipInstruction();
                } else {
                    this._nextInstruction();
                };
                break;
            };
            case 'STO_VX_DT': {
                this.registers.set([this.DT], args[0]);
                break;
            };
            case 'WAIT': {
                this.interface._waitKey();
                break;
            };
            case 'SET_DT_VX': {
                this.DT = this.registers[args[0]];
                break;
            };
            case 'SET_ST_VX': {
                this.ST = this.registers[args[0]];
                break;
            };
            case 'ADD_VX_I': {
                this.I = (this.I + this.registers[args[0]]);
                break;
            };
            case 'SET_I_VX': {
                // Set I register to the location of the sprite data corresponding to the value at the VX register
                this.I = this.registers[args[0]];
                this._nextInstruction();
                break;
            };
            case 'STO_VX_I': {
                // Store binary-coded decimal of value at VX in memory at addresses I, I+1, and I+2
                let x = this.registers[args[0]];
                const a = Math.floor(x/100);
                x = x - a * 100;
                const b = Math.floor(x/10);
                x = x - b * 10;
                const c = Math.floor(x)

                this.memory[this.I] = a;
                this.memory[this.I + 1] = b;
                this.memory[this.I + 2] = c;

                this._nextInstruction();
                break;
            };
            case 'LD_REG': {
                // Iterate through registers up to VX and store values in memory starting at this.I
                for (let i = 0; i <= args[0]; i++) {
                    this.memory[this.I + i] = this.registers[i]
                };
                this._nextInstruction();
                break;
            };
            case 'LD_MEM': {
                // Iterate through memory starting at address I and store values at registers up to VX
                for (let i = 0; i <= args[0]; i++) {
                    this.registers[i] = this.memory[this.I + i] 
                };
                this._nextInstruction();
                break;
            };
        };
    };
};

export default CPU;