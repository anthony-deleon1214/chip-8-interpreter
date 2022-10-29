// Importing disassembler function
import disassemble from "./disassembler";

interface CPU {
    memory: Uint8Array,
    registers: Uint8Array,
    stack: Uint16Array,
    SP: number,
    PC: number,
    I: number,
    DT: number,
    ST: number,
};

// Creating a CPU class
class CPU {
    constructor() {
        this.memory = new Uint8Array(4096);
        this.registers = new Uint8Array(16);
        this.stack = new Uint16Array(16);
        this.SP = -1;       // Stack pointer (index in stack array)
        this.PC = 0x200;    // Program counter (instruction pointer)
        this.I = 0;         // Index register
        this.DT = 0;        // Delay timer
        this.ST = 0;        // Sound timer
    };

    // Reading ROM into buffer

    
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

    _execute(instruction) {
        // Destructure the object into id and arguments
        const { id, args } = instruction;
        switch(id) {
            case 'CLR':
                break;
            case 'RET':
                break;
            case 'JP_ADDR':
                break;
            case 'CALL_ADDR':
                break;
            case 'SE_VX_NN':
                break;
            case 'SNE_VX_NN':
                break;
            case 'SE_VX_VY':
                break;
            case 'STO_NN_VX': {
                const targetRegister = args[0];
                const targetValue = args[1];
                this.registers.set(targetValue, targetRegister);
                break;
            }
            case 'ADD_NN_VX': {
                const targetRegister = args[0]
                const targetValue = args[1]
                break;
            }
            case 'STO_VY_VX':
                break;
        }
    };
}