// Array of opcode objects
// Types: 'A' = 'Address', 'R' = 'Register', 'NN' = 'Hex byte', 
const INSTRUCTION_SET = [
    {
        id: 'CLR',
        name: 'CLR',
        description: 'Clear screen',
        mask: 0xFFFF,
        pattern: 0x00E0,
        arguments: [],
    },
    {
        id: 'RET',
        name: 'RET',
        description: 'Return from a subroutine',
        mask: 0xFFFF,
        pattern: 0x00EE,
        arguments: [],
    },
    {
        id: 'JP_ADDR',
        name: 'JP_ADDR',
        description: 'Jump to address NNN',
        mask: 0xF000,
        pattern: 0x1000,
        arguments: [{ mask: 0x0FFF, shift: 0, type: 'A' }],
    },
    {
        id: 'CALL_ADDR',
        name: 'CALL_ADDR',
        description: 'Execute subroutine at address NNN',
        mask: 0xF000,
        pattern: 0x2000,
        arguments: [{ mask: 0x0FFF, shift: 0, type: 'A' }],
    },
    {
        id: 'SE_VX_NN',
        name: 'SE',
        description: 'Skip next instruction if VX value equals NN',
        mask: 0xF000,
        pattern: 0x3000,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00FF, shift: 0, type: 'NN' }],
    },
    {
        id: 'SNE_VX_NN',
        name: 'SNE',
        description: 'Skip next instruction if VX not equal to NN',
        mask: 0xF000,
        pattern: 0x4000,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00FF, shift: 0, type: 'NN' }],
    },
    {
        id: 'SE_VX_VY',
        name: 'SE_VX_VY',
        description: 'Skip next instruction if VX equal to VY',
        mask: 0xF00F,
        pattern: 0x5000,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00F0, shift: 4, type: 'R' }],
    },
    {
        id: 'STO_NN_VX',
        name: 'STO_NN_VX',
        description: 'Store value NN in register VX',
        mask: 0xF000,
        pattern: 0x6000,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00FF, shift: 0, type: 'NN' }],
    },
    {
        id: 'ADD_NN_VX',
        name: 'ADD_NN_VX',
        description: 'Add value NN to register VX',
        mask: 0xF000,
        pattern: 0x7000,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00FF, shift: 0, type: 'NN' }],
    },
    {
        id: 'STO_VY_VX',
        name: 'STO_VY_VX',
        description: 'Store the value in VY in VX',
        mask: 0xF00F,
        pattern: 0x8000,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00F0, shift: 4, type: 'R' }],
    },
    {
        id: 'VX_OR_VY',
        name: 'VX_OR_VY',
        description: 'Set VX to VX OR VY',
        mask: 0xF00F,
        pattern: 0x8001,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00F0, shift: 4, type: 'R' }],
    },
    {
        id: 'VX_AND_VY',
        name: 'VX_AND_VY',
        description: 'Set VX to VX AND VY',
        mask: 0xF00F,
        pattern: 0x8002,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00F0, shift: 4, type: 'R' }],
    },
    {
        id: 'VX_XOR_VY',
        name: 'VX_XOR_VY',
        description: 'Set VX to VX XOR VY',
        mask: 0xF00F,
        pattern: 0x8003,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00F0, shift: 4, type: 'R' }],
    },
    {
        id: 'ADD_VY_VX',
        name: 'ADD_VY_VX',
        description: 'Add VY to VX, set VF to 01 if carry is required, 00 otherwise',
        mask: 0xF00F,
        pattern: 0x8004,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00F0, shift: 4, type: 'R' }],
    },
    {
        id: 'SUB_VY_VX',
        name: 'SUB_VY_VX',
        description: 'Subtract VY from VX, set VF to 00 if borrow occurs, 01 otherwise',
        mask: 0xF00F,
        pattern: 0x8005,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00F0, shift: 4, type: 'R' }],
    },
    {
        id: 'SHR_VY_VX',
        name: 'SHR',
        description: 'Store value in VY shifted right one bit in VX, VY is unchanged, set VF to LSB prior to shift',
        mask: 0xF00F,
        pattern: 0x8006,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00F0, shift: 4, type: 'R' }],
    },
    {
        id: 'SUBN_VX_VY',
        name: 'SUBN_VX_VY',
        description: 'Set VX to the value of VY minus VX, set VF to 00 if borrow occurs, 01 otherwise',
        mask: 0xF00F,
        pattern: 0x8007,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00F0, shift: 4, type: 'R' }],
    },
    {
        id: 'SHL_VY_VX',
        name: 'SHL',
        description: 'Store value in VY shifted left one bit in VX, VY is unchanged, set VF equal to MSB prior to shift',
        mask: 0xF00F,
        pattern: 0x800E,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00F0, shift: 4, type: 'R' }],
    },
    {
        id: 'SNE_VX_VY',
        name: 'SNE',
        description: 'Skip next instruction if VX is not equal to VY',
        mask: 0xF00F,
        pattern: 0x9000,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00F0, shift: 4, type: 'R' }],
    },
    {
        id: 'STO_NNN_I',
        name: 'STO',
        description: 'Store memory address NNN in register I',
        mask: 0xF000,
        pattern: 0xA000,
        arguments: [{ mask: 0x0FFF, shift: 0, type: 'NNN' }],
    },
    {
        id: 'JMP_V0',
        name: 'JMP',
        description: 'Jump to memory address NNN + V0',
        mask: 0xF000,
        pattern: 0xB000,
        arguments: [{ mask: 0x0FFF, shift: 0, type: 'NNN' }],
    },
    {
        id: 'RND_VX_NN',
        name: 'RND',
        description: 'Set VX to a random number with a mask of NN',
        mask: 0xF000,
        pattern: 0xC000,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00FF, shift: 0, type: 'NN' }],
    },
    {
        id: 'DRW_VX_VY_N',
        name: 'DRW',
        description: 'Draw sprite at coord VX, VY with N bytes of sprite data starting from memory address in I register, set VF to 01 if any pixels are changed to unset, 00 otherwise',
        mask: 0xF000,
        pattern: 0xD000,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }, { mask: 0x00F0, shift: 4, type: 'R' }, { mask: 0x000F, shift: 0, type: 'N' }],
    },
    {
        id: 'SKP_VX',
        name: 'SKP',
        description: 'Skip next instruction if the key corresponding to the hex value in VX is pressed',
        mask: 0xF0FF,
        pattern: 0xE09E,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }],
    },
    {
        id: 'SKNP_VX',
        name: 'SKNP',
        description: 'Skip next instruction if the key corresponding to the hex value in VX is not pressed',
        mask: 0xF0FF,
        pattern: 0xE0A1,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }],
    },
    {
        id: 'STO_VX_DT',
        name: 'STO_VX_DT',
        description: 'Store the value of the delay timer in VX register',
        mask: 0xF0FF,
        pattern: 0xF007,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }],
    },
    {
        id: 'WAIT',
        name: 'WAIT',
        description: 'Wait for a keypress and store result in VX register',
        mask: 0xF0FF,
        pattern: 0xF00A,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }],
    },
    {
        id: 'SET_DT_VX',
        name: 'SET_DT_VX',
        description: 'Set the delay timer to the value in VX register',
        mask: 0xF0FF,
        pattern: 0xF015,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }],
    },
    {
        id: 'SET_ST_VX',
        name: 'SET_ST_VX',
        description: 'Set the sound timer to the value in the VX register',
        mask: 0xF0FF,
        pattern: 0xF018,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }],
    },
    {
        id: 'ADD_VX_I',
        name: 'ADD',
        description: 'Add the value stored in VX to register I',
        mask: 0xF0FF,
        pattern: 0xF01E,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }],
    },
    {
        id: 'SET_I_VX',
        name: 'SET_I_VX',
        description: 'Set register I to memory address of the sprite data corresponding to the hex digit stored in register VX',
        mask: 0xF0FF,
        pattern: 0xF029,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }],
    },
    {
        id: 'STO_VX_I',
        name: 'STO_VX_I',
        description: 'Store binary-coded decimal equivalent of value in VX at addresses I, I+1, and I+2',
        mask: 0xF0FF,
        pattern: 0xF033,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }],
    },
    {
        id: 'LD_REG',
        name: 'LD_REG',
        description: 'Store values of registers V0 to VX in memory starting from address I, then set I to I+X+1',
        mask: 0xF0FF,
        pattern: 0xF055,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }],
    },
    {
        id: 'LD_MEM',
        name: 'LD_MEM',
        description: 'Fill registers V0 to VX inclusive with values stored in memory from address I, then set I to I+X+1',
        mask: 0xF0FF,
        pattern: 0xF065,
        arguments: [{ mask: 0x0F00, shift: 8, type: 'R' }],
    },
];

export default INSTRUCTION_SET;