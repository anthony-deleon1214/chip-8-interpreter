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
            case 'SE_VX_NN': {
                if (this.registers[args[0]] === args[1]) {
                    this.PC++;
                };
                break;
            };
            case 'SNE_VX_NN': {
                if (this.registers[args[0]] !== args[1]) {
                    this.PC++;
                };
            };
                break;
            case 'SE_VX_VY': {
                if (this.registers[args[0]] === this.registers[args[1]]) {
                    this.PC++;
                };
            };
                break;
            case 'STO_NN_VX': {
                const targetRegister = args[0];
                const targetValue = args[1];
                this.registers.set(targetValue, targetRegister);
            };
                break;
            case 'ADD_NN_VX': {
                const targetRegister = args[0];
                const targetValue = args[1];
                this.registers.set((targetValue + this.registers[targetRegister], targetRegister));
            };
                break;
            case 'STO_VY_VX': {
                const vxRegister = args[0];
                const vyRegisterValue = this.registers[args[1]];
                this.registers.set([vyRegisterValue], vxRegister);
            };
                break;
            case 'VX_OR_VY': {
            };
                break;
        }
    };
}