import { expect, jest, test } from '@jest/globals';
import CPU from './CPU';
import disassemble from './disassembler';
import INSTRUCTION_SET from './instructionSet';

test('Execute')