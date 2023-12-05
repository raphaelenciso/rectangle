const { JSDOM } = require("jsdom");
const { window } = new JSDOM();

class Rectangle {
  constructor(plainText, key) {
    this.plainText = new Uint16Array(plainText);
    this.cipherText = new Uint16Array(plainText);
    this.key = new Uint32Array(key);
    this.mainKey = new Uint32Array(key);
    this.rc = 0;
    this.seed = 0;
    this.p = 0; // Large prime number congruent to 3 modulo 4
    this.q = 0; // Large prime number congruent to 3 modulo 4
    this.length = 128; // Length of the output bit sequence
    this.bbsOutput;
  }

  clsh(num, shift, is32bit = false) {
    let newNum;
    if (is32bit) {
      newNum = num.toString(2).padStart(32, "0").split("");
    } else {
      newNum = num.toString(2).padStart(16, "0").split("");
    }

    return parseInt(
      [...newNum.slice(shift), ...newNum.slice(0, shift)].join(""),
      2
    );
  }

  generateRC(index) {
    const roundConstants = [
      0x01, 0x02, 0x04, 0x09, 0x12, 0x05, 0x0b, 0x16, 0x0c, 0x19, 0x13, 0x07,
      0x0f, 0x1f, 0x1e, 0x1c, 0x18, 0x11, 0x03, 0x06, 0x0d, 0x1b, 0x17, 0x0e,
      0x1d,
    ];
    this.rc = roundConstants[index];
  }

  bbsRC(index) {
    // let roundConstantP = [
    //   0x0fcf, 0x9b7f, 0x44e3, 0x9ed7, 0xe4f7, 0xc04b, 0xefb3, 0xb98f, 0xf187,
    //   0xaadb, 0x422b, 0x4893, 0xe43b, 0x820b, 0xbe07, 0xb0bf, 0x1ffb, 0xe41f,
    //   0xf583, 0xbdaf, 0xbbd3, 0x3163, 0x920f, 0x9647, 0xcc5b,
    // ];

    // let roundConstantQ = [
    //   0xbe07, 0x0fcf, 0x9b7f, 0x44e3, 0x9ed7, 0xefb3, 0xf187, 0xaadb, 0x422b,
    //   0xb98f, 0xf583, 0xbdaf, 0xbbd3, 0x3163, 0x920f, 0x9647, 0xb0bf, 0xcc5b,
    //   0xe4f7, 0xc04b, 0x4893, 0xe43b, 0x820b, 0x1ffb, 0xe41f,
    // ];

    let roundConstantP = [
      0x0fcf, 0x9b7f, 0x0, 0x9ed7, 0x0, 0x0, 0x0, 0xb98f, 0x0, 0x0, 0x0, 0x0,
      0x0, 0x0, 0x0, 0xb0bf,
    ];

    let roundConstantQ = [
      0xbe07, 0x0fcf, 0x0, 0x44e3, 0x0, 0x0, 0x0, 0xaadb, 0x0, 0x0, 0x0, 0x0,
      0x0, 0x0, 0x0, 0x9647,
    ];

    this.p = roundConstantP[index];
    this.q = roundConstantQ[index];
  }

  sBox(num) {
    const sBoxTable = [
      0x06, 0x05, 0x0c, 0x0a, 0x01, 0x0e, 0x07, 0x09, 0x0b, 0x00, 0x03, 0x0d,
      0x08, 0x0f, 0x04, 0x02,
    ];
    return sBoxTable[num];
  }

  inverse_sBox(num) {
    const sBoxTable = [
      0x09, 0x04, 0x0f, 0x0a, 0x0e, 0x01, 0x00, 0x06, 0x0c, 0x07, 0x03, 0x08,
      0x02, 0x0b, 0x05, 0x0d,
    ];
    return sBoxTable[num];
  }

  blumBlumShub(seed, p, q, length) {
    var n = p * q;
    var x = seed;
    var result = "";

    for (var i = 0; i < length; i++) {
      x = (x * x) % n;
      var bit = x % 2;
      result += bit;
    }

    return new Uint32Array([
      parseInt(result.slice(0, 32), 2),
      parseInt(result.slice(32, 64), 2),
      parseInt(result.slice(64, 96), 2),
      parseInt(result.slice(96, 128), 2),
    ]);
  }

  generateRoundKey(final = false, round) {
    const roundKey = new Uint16Array(this.key);

    if (!final) {
      this.subColumn(this.key, 8);

      const row0 = this.key[0];
      this.key[0] = this.clsh(this.key[0], 8, true) ^ this.key[1];
      this.key[1] = this.key[2];
      this.key[2] = this.clsh(this.key[2], 16, true) ^ this.key[3];
      this.key[3] = row0;

      // let lowerBits5 = this.key[0] & 0x0000001f;
      // lowerBits5 ^= this.rc;
      // this.key[0] = (this.key[0] & 0xffffffe0) | lowerBits5;

      // this.bbsRC(round - 1);
      if (
        round === 1 ||
        round === 2 ||
        round === 4 ||
        round === 8 ||
        round === 16
      ) {
        this.bbsRC(round - 1);
        this.bbsOuput = this.blumBlumShub(
          this.key[0],
          this.p,
          this.q,
          this.length
        );
      }
      for (let i = 0; i < 4; i++) {
        this.key[i] ^= this.bbsOuput[i];
      }
    }

    return roundKey;
  }

  addRoundKey(roundKey) {
    for (let i = 0; i < 4; i++) {
      this.cipherText[i] ^= roundKey[i];
    }
  }

  moduloAddition(roundKey, addition = true) {
    for (let i = 0; i < 4; i++) {
      if (addition === true) {
        this.cipherText[i] = this.cipherText[i] + (roundKey[i] % 64);
      } else {
        this.cipherText[i] = this.cipherText[i] - (roundKey[i] % 64);
      }
    }
  }

  subColumn(state, cols = 16, sBox = this.sBox) {
    for (let i = 0; i < cols; i++) {
      let colVal = 0;
      const keyBits = [];
      for (let j = 0; j < 4; j++) {
        keyBits.push((state[j] >> i) & 1);
        colVal |= keyBits[j] << j;
      }
      colVal = sBox(colVal);
      for (let j = 0; j < 4; j++) {
        const colBit = (colVal >> j) & 1;
        state[j] ^= (colBit ^ keyBits[j]) << i;
      }
    }
  }

  NonceXOR(addition = true) {
    //NCS VLRD
    // 4E43 5320 564C 5244
    const nonceValue = new Uint16Array([0x4e43, 0x5320, 0x564c, 0x5244]);

    const nonceValue2 = new Uint16Array([0x564c, 0x5244, 0x4e43, 0x5320]);

    for (let i = 0; i < 4; i++) {
      this.cipherText[i] ^= nonceValue[i];
    }

    // for (let i = 0; i < 4; i++) {
    //   if (addition === true) {
    //     this.cipherText[i] = this.cipherText[i] * (nonceValue[i] % 64);
    //   } else {
    //     this.cipherText[i] = this.cipherText[i] / (nonceValue[i] % 64);
    //   }
    // }
  }

  shiftRow(inv = 0) {
    this.cipherText[1] = this.clsh(this.cipherText[1], Math.abs(inv - 1));
    this.cipherText[2] = this.clsh(this.cipherText[2], Math.abs(inv - 12));
    this.cipherText[3] = this.clsh(this.cipherText[3], Math.abs(inv - 13));
  }

  saveInverseKeys() {
    const roundKeys = [];

    for (let i = 0; i < 25; i++) {
      // this.generateRC(i);
      roundKeys.push(this.generateRoundKey(false, i + 1));
    }
    roundKeys.push(this.generateRoundKey(true));
    return roundKeys;
  }

  encrypt(keys = 0) {
    let roundkeys = [];

    for (let i = 0; i < 25; i++) {
      // this.generateRC(i);
      const roundKey = this.generateRoundKey(false, i + 1);

      //extended function for non-robust
      if (keys === 1.1) {
        let binRoundKey = this.transformToBin(roundKey);
        roundkeys.push(binRoundKey);
      }

      this.addRoundKey(roundKey);
      this.moduloAddition(roundKey);
      this.subColumn(this.cipherText);
      this.NonceXOR();
      this.shiftRow();
    }
    const roundKey = this.generateRoundKey(true);

    if (keys === 1.1) {
      //extended function for non-robust
      let binRoundKey = this.transformToBin(roundKey);
      roundkeys.push(binRoundKey);
    }

    this.addRoundKey(roundKey);

    return roundkeys;
  }

  decrypt() {
    this.key = this.mainKey;
    const roundKeys = this.saveInverseKeys();

    const roundKey = roundKeys[25];
    this.addRoundKey(roundKey);
    for (let i = 24; i >= 0; i--) {
      this.shiftRow(16);
      this.NonceXOR();
      this.subColumn(this.cipherText, 16, this.inverse_sBox);
      const roundKey = roundKeys[i];
      this.moduloAddition(roundKey, false);
      this.addRoundKey(roundKey);
    }
  }

  transformToBin(ptk) {
    let roundkey = "";

    ptk.forEach(
      (row) =>
        // process.stdout.write()
        (roundkey += row.toString(2).padStart(16, "0"))
    );

    return roundkey;
  }
}

// const testCases = [
//   {
//     plaintext: [0x0000, 0x0000, 0x0000, 0x0000],
//     key: [0x00000000, 0x00000000, 0x00000000, 0x00000000],
//   },
//   {
//     plaintext: [0xffff, 0xffff, 0xffff, 0xffff],
//     key: [0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff],
//   },
// ];

// testCases.forEach((testCase) => {
//   console.log("\nStart test case\n");

//   const newRectangle = new Rectangle(testCase.plaintext, testCase.key);

//   console.log("Plain Text: ");
//   newRectangle.plainText.forEach((row) =>
//     process.stdout.write(row.toString(16).padStart(4, "0"))
//   );
//   console.log("\n-----------------------");

//   console.log("Cipher Text: ");
//   newRectangle.encrypt();
//   newRectangle.cipherText.forEach((row) =>
//     process.stdout.write(row.toString(16).padStart(4, "0"))
//   );
//   console.log("\n-----------------------");

//   console.log("Plain Text after decryption: ");
//   newRectangle.decrypt();
//   newRectangle.cipherText.forEach((row) =>
//     process.stdout.write(row.toString(16).padStart(4, "0"))
//   );
//   console.log("\n-----------------------");
// });

module.exports = Rectangle;
