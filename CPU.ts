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
    }
}