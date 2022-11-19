// Testing that disassembler properly return opcode object with args given 16-bit hex value

import { expect, jest, test } from '@jest/globals';
import disassemble from './disassembler';
import INSTRUCTION_SET from '../instructionSet';

test('Clear screen', () => {
    expect(disassemble(0x00E0)).toStrictEqual({ instruction: INSTRUCTION_SET[0], args: []});
});

test('Return from subroutine', () => {
    expect(disassemble(0x00EE)).toStrictEqual({ instruction: INSTRUCTION_SET[1], args: []});
});

test('Jump to address 0x1A4', () => {
    expect(disassemble(0x11A4)).toStrictEqual({ instruction: INSTRUCTION_SET[2], args: [0x1A4]});
});

test('Call address 0x25B', () => {
    expect(disassemble(0x225B)).toStrictEqual({ instruction: INSTRUCTION_SET[3], args: [0x25B]});
});

test('Skip if VX equals NN', () => {
    expect(disassemble(0x3C44)).toStrictEqual({ instruction: INSTRUCTION_SET[4], args: [0xC, 0x44]});
});

test('Skip if VX not equal to NN', () => {
    expect(disassemble(0x4C44)).toStrictEqual({ instruction: INSTRUCTION_SET[5], args: [0xC, 0x44]});
});

test('Skip if value at VX equals value at VY', () => {
    expect(disassemble(0x5AB0)).toStrictEqual({ instruction: INSTRUCTION_SET[6], args: [0xA, 0xB]});
});

test('Store NN in VX', () => {
    expect(disassemble(0x65CD)).toStrictEqual({ instruction: INSTRUCTION_SET[7], args: [0x5, 0xCD]});
});

test('Add NN to value in VX', () => {
    expect(disassemble(0x7D12)).toStrictEqual({ instruction: INSTRUCTION_SET[8], args: [0xD, 0x12]});
});

test('Store value of VY in VX', () => {
    expect(disassemble(0x8720)).toStrictEqual({ instruction: INSTRUCTION_SET[9], args: [0x7, 0x2]});
});

test('Set VX to VX OR VY', () => {
    expect(disassemble(0x8E31)).toStrictEqual({ instruction: INSTRUCTION_SET[10], args: [0xE, 0x3]});
});

test('Set VX to VX AND VY', () => {
    expect(disassemble(0x83D2)).toStrictEqual({ instruction: INSTRUCTION_SET[11], args: [0x3, 0xD]});
});

test('Set VX to VX XOR VY', () => {
    expect(disassemble(0x84A3)).toStrictEqual({ instruction: INSTRUCTION_SET[12], args: [0x4, 0xA]});
});

test('Add value of VY to VX, set VF', () => {
    expect(disassemble(0x84B4)).toStrictEqual({ instruction: INSTRUCTION_SET[13], args: [0x4, 0xB]});
});

test('Subtract value of VY from VX, set VF', () => {
    expect(disassemble(0x8235)).toStrictEqual({ instruction: INSTRUCTION_SET[14], args: [0x2, 0x3]});
});

test('Store VY bitshifted right one bit in VX, set VF to LSB prior to shift', () => {
    expect(disassemble(0x81A6)).toStrictEqual({ instruction: INSTRUCTION_SET[15], args: [0x1, 0xA]});
});

test('Set VX to value of VY minus VX, set VF', () => {
    expect(disassemble(0x8AB7)).toStrictEqual({ instruction: INSTRUCTION_SET[16], args: [0xA, 0xB]});
});

test('Store value of VY shifted left one bit in VX, set VF to MSB prior to shift', () => {
    expect(disassemble(0x8ABE)).toStrictEqual({ instruction: INSTRUCTION_SET[17], args: [0xA, 0xB]});
});

test('Skip next instruction if VX is not equal to VY', () => {
    expect(disassemble(0x9CD0)).toStrictEqual({ instruction: INSTRUCTION_SET[18], args: [0xC, 0xD]});
});

test('Store address NNN in register I', () => {
    expect(disassemble(0xA451)).toStrictEqual({ instruction: INSTRUCTION_SET[19], args: [0x451]});
});

test('Jump to address NNN + V0', () => {
    expect(disassemble(0xB451)).toStrictEqual({ instruction: INSTRUCTION_SET[20], args: [0x451]});
});

test('Set VX to a random number with mask NN', () => {
    expect(disassemble(0xCA27)).toStrictEqual({ instruction: INSTRUCTION_SET[21], args: [0xA, 0x27]});
});

test('Draw sprite at pos VX, VY with N bytes of sprite data, set VF', () => {
    expect(disassemble(0xD06B)).toStrictEqual({ instruction: INSTRUCTION_SET[22], args: [0x0, 0x6, 0xB]});
});

test('Skip if key corresponding to VX is pressed', () => {
    expect(disassemble(0xEA9E)).toStrictEqual({ instruction: INSTRUCTION_SET[23], args: [0xA]});
});

test('Skip if key corresponding to VX is not pressed', () => {
    expect(disassemble(0xEBA1)).toStrictEqual({ instruction: INSTRUCTION_SET[24], args: [0xB]});
});

test('Store value of delay timer in VX', () => {
    expect(disassemble(0xF707)).toStrictEqual({ instruction: INSTRUCTION_SET[25], args: [0x7]});
});

test('Wait for keypress and store in VX', () => {
    expect(disassemble(0xF30A)).toStrictEqual({ instruction: INSTRUCTION_SET[26], args: [0x3]});
});

test('Set delay timer to value in VX', () => {
    expect(disassemble(0xFA15)).toStrictEqual({ instruction: INSTRUCTION_SET[27], args: [0xA]});
});

test('Set sound timer to value in VX', () => {
    expect(disassemble(0xF218)).toStrictEqual({ instruction: INSTRUCTION_SET[28], args: [0x2]});
});

test('Add value in VX to register I', () => {
    expect(disassemble(0xF31E)).toStrictEqual({ instruction: INSTRUCTION_SET[29], args: [0x3]});
});

test('Set register I to memory address of sprite data represented by value in VX', () => {
    expect(disassemble(0xF429)).toStrictEqual({ instruction: INSTRUCTION_SET[30], args: [0x4]});
});

test('Store BCD of VX at addresses I, I+1, and I+2', () => {
    expect(disassemble(0xF633)).toStrictEqual({ instruction: INSTRUCTION_SET[31], args: [0x6]});
});

test('Store registers V0 to VX inclusive in memory starting from address I, then update I', () => {
    expect(disassemble(0xF755)).toStrictEqual({ instruction: INSTRUCTION_SET[32], args: [0x7]});
});

test('Fill registers V0 to VX inclusive with values in memory starting from I, then update I', () => {
    expect(disassemble(0xF765)).toStrictEqual({ instruction: INSTRUCTION_SET[33], args: [0x7]});
});