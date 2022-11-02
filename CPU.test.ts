import { expect, jest, test } from '@jest/globals';
import CPU from './CPU';
import disassemble from './disassembler';
import INSTRUCTION_SET from './instructionSet';

test('JP_ADDR', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x1ABC); // Should set PC to 0xABC
    testCPU._execute(instruction);
    expect(testCPU.PC).toEqual(0xABC);
    expect(testCPU.SP).toEqual(1);
    expect(testCPU.stack[0]).toEqual(0x200);
});

test('CALL_ADDR', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x2ABC)
});

test('SE_VX_NN', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x3ABC);
    testCPU.registers[0xA] = 0xBC;
    testCPU._execute(instruction);
    expect(testCPU.PC).toEqual(0x202);
});

test('SNE_VX_NN', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x4ABC);
    testCPU.registers[0xA] = 0xCD;
    testCPU._execute(instruction);
    expect(testCPU.PC).toEqual(0x202);
});

test('SE_VX_VY', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x5070);
    testCPU.registers[0] = 0xAB;
    testCPU.registers[7] = 0xAB;
    testCPU._execute(instruction);
    expect(testCPU.PC).toEqual(0x202);
});

test('STO_NN_VX', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x651A);
    testCPU._execute(instruction);
    expect(testCPU.registers[5]).toEqual(0x1A);
});

test('ADD_NN_VX', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x7145);
    testCPU.registers[1] = 0x83;
    testCPU._execute(instruction);
    expect(testCPU.registers[1]).toEqual(0xC8);
});