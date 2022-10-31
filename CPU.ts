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
                break;
            };
            case 'SE_VX_VY': {
                if (this.registers[args[0]] === this.registers[args[1]]) {
                    this.PC++;
                };
                break;
            };
            case 'STO_NN_VX': {
                const targetRegister = args[0];
                const targetValue = args[1];
                this.registers.set(targetValue, targetRegister);
                break;
            };
            case 'ADD_NN_VX': {
                const targetRegister = args[0];
                const targetValue = args[1];
                this.registers.set((targetValue + this.registers[targetRegister], targetRegister));
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
                const result = (this.registers[args[0]] | this.registers[args[1]]);
                this.registers.set([result], this.registers[args[0]]);
                break;
            };    
            case 'VX_XOR_VY': {
                const result = (this.registers[args[0]] ^ this.registers[args[1]]);
                this.registers.set([result], this.registers[args[0]]);
                break;
            };
            case 'ADD_VY_VX': {
                this.registers.set([(this.registers[args[0]] + this.registers[args[1]])], this.registers[args[0]]);
                break;
            };
            case 'SUB_VY_VX': {
                this.registers.set([(this.registers[args[0]] - this.registers[args[1]])], this.registers[args[0]]);
                break;
            };
            case 'SHR_VY_VX': {
                const lsbMask = 0x01;
                const LSB = this.registers[args[1]] & lsbMask;
                this.registers.set([LSB], 0xF);
                this.registers.set([this.registers[args[1]] >> 1], this.registers[args[0]]);
                break;
            };
            case 'SUBX-VX_VY': {
                const VX = this.registers[args[0]];
                const VY = this.registers[args[1]];
                let newVX = VY-VX
                // Need to figure out checking for borrow
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
                    this.PC++
                };
                break;
            };
            case 'STO_NNN_I': {
                this.I = args[0];
            };
            case 'JMP_V0': {
                this.PC = (this.registers[0] + args[0]);
            };
            case 'RND_VX_NN': {
                break;
            };
            case 'DRW_VX_VY_N': {
                break;
            };
            case 'SKP_VX': {
                break;
            };
            case 'SKNP_VX': {
                break;
            };
            case 'STO_VX_DT': {
                break;
            };
            case 'WAIT': {
                break;
            };
            case 'SET_DT_VX': {
                break;
            };
            case 'SET_ST_VX': {
                break;
            };
            case 'ADD_VX_I': {
                break;
            };
            case 'SET_I_VX': {
                break;
            };
            case 'STO_VX_I': {
                break;
            };
            case 'LD_REG': {
                break;
            };
            case 'LD_MEM': {
                break;
            };
        }
    };
}