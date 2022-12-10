// Creating a CPU Interface to use for I/O

class CpuInterface {
    constructor() {
        if (new.target === CpuInterface) {
            throw new TypeError('Cannot instantiate abstract class');
        };
    };
};

export default CpuInterface;