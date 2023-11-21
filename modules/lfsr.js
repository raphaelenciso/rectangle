class LFSR_PRNG {
  constructor(seed, taps) {
    this.state = seed;
    this.taps = taps;
  }

  clock() {
    let feedback = 0;
    for (const tap of this.taps) {
      feedback ^= (this.state >> tap) & 1;
    }
    this.state = (this.state >> 1) | (feedback << (this.taps[0] - 1));
    return this.state & 1;
  }

  random() {
    let result = 0;
    for (let i = 0; i < 32; i++) {
      result = (result << 1) | this.clock();
    }
    return result >>> 0; // Ensure the result is an unsigned 32-bit integer
  }

  randomFloat() {
    return this.random() / 0xffffffff;
  }
}

// Example usage:
const seed = 0b1010; // Initial seed
const taps = [3, 2]; // Feedback taps

const prng = new LFSR_PRNG(seed, taps);

// Generate and print 10 random numbers between 0 and 1
for (let i = 0; i < 10; i++) {
  console.log(prng.randomFloat());
}
