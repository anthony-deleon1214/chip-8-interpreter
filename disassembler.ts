import INSTRUCTION_SET from "./instructionSet";

function disassemble(opcode) {
    // Use bitmasks and patterns to match opcode to an instruction pattern
    const instruction = INSTRUCTION_SET.find(
        (instruction) => (opcode & instruction.mask) === instruction.pattern
    )

    // Parse the arguments out of the opcode
    const args = instruction?.arguments.map((arg) => (opcode & arg.mask) >> arg.shift)

    // Return instruction and args as an object
    return { instruction, args }
}