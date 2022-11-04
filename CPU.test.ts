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

test('STO_VY_VX', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x8AB0);
    testCPU.registers[0xB] = 0x3D;
    testCPU._execute(instruction);
    expect(testCPU.registers[0xA]).toEqual(0x3D);
});

test('VX_OR_VY', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x8121);
    testCPU.registers[1] = 0x4A;
    testCPU.registers[2] = 0x37;
    testCPU._execute(instruction);
    expect(testCPU.registers[1]).toEqual(0x7F);
});

test('VX_AND_VY', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x8342);
    testCPU.registers[3] = 0x4A;
    testCPU.registers[4] = 0x37;
    testCPU._execute(instruction);
    expect(testCPU.registers[3]).toEqual(0x2);
});

test('VX_XOR_VY', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x8563);
    testCPU.registers[5] = 0x4A;
    testCPU.registers[6] = 0x37;
    testCPU._execute(instruction);
    expect(testCPU.registers[5]).toEqual(0x7D);
});

test('ADD_VY_VX', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x8014);
    testCPU.registers[0] = 0x4B;
    testCPU.registers[1] = 0x32;
    testCPU._execute(instruction);
    expect(testCPU.registers[0]).toEqual(0x7D);
});

test('SUB_VY_VX', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x8235);
    testCPU.registers[2] = 0xA5;
    testCPU.registers[3] = 0x42;
    testCPU._execute(instruction);
    expect(testCPU.registers[2]).toEqual(0x63);
});

test('SHR_VY_VX', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x8016);
    testCPU.registers[1] = 0xB3;
    testCPU._execute(instruction);
    expect(testCPU.registers[0]).toEqual(0x59);
    expect(testCPU.registers[15]).toEqual(0x1);
});

test('SUBX_VX_VY', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x8017);
    testCPU.registers[0] = 0xA3;
    testCPU.registers[1] = 0xD7;
    testCPU._execute(instruction);
    expect(testCPU.registers[0]).toEqual(0x34);
});

test('SHL_VY_VX', () => {
    const testCPU = new CPU;
    const instruction = disassemble(0x801E);
    testCPU.registers[1] = 0xA5;
    testCPU._execute(instruction);
    expect(testCPU.registers[0]).toEqual(0x4A);
});

