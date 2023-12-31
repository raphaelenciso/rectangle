const { JSDOM } = require("jsdom");
const { window } = new JSDOM();

class Rectangle {
  constructor(plainText, key) {
    this.plainText = new Uint16Array(plainText);
    this.cipherText = new Uint16Array(plainText);
    this.key = new Uint32Array(key);
    this.mainKey = new Uint32Array(key);
    this.rc = 0;
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

  generateRoundKey(final = false) {
    const roundKey = new Uint16Array(this.key);

    if (!final) {
      this.subColumn(this.key, 8);

      const row0 = this.key[0];
      this.key[0] = this.clsh(this.key[0], 8, true) ^ this.key[1];
      this.key[1] = this.key[2];
      this.key[2] = this.clsh(this.key[2], 16, true) ^ this.key[3];
      this.key[3] = row0;

      let lowerBits5 = this.key[0] & 0x0000001f;
      lowerBits5 ^= this.rc;
      this.key[0] = (this.key[0] & 0xffffffe0) | lowerBits5;
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

  NonceXOR() {
    //ncs vlrd 6E 63 73 20 76 6C 72 64
    const nonceValue = new Uint16Array([0x6e63, 0x7320, 0x766c, 0x7264]);
    for (let i = 0; i < 4; i++) {
      this.cipherText[i] ^= nonceValue[i];
    }
  }

  shiftRow(inv = 0) {
    this.cipherText[1] = this.clsh(this.cipherText[1], Math.abs(inv - 1));
    this.cipherText[2] = this.clsh(this.cipherText[2], Math.abs(inv - 12));
    this.cipherText[3] = this.clsh(this.cipherText[3], Math.abs(inv - 13));
  }

  saveInverseKeys() {
    const roundKeys = [];

    for (let i = 0; i < 25; i++) {
      this.generateRC(i);
      roundKeys.push(this.generateRoundKey());
    }
    roundKeys.push(this.generateRoundKey(true));
    return roundKeys;
  }

  encrypt() {
    const numberOfRuns = 10000;
    let totalTime = 0;

    for (let i = 0; i < numberOfRuns; i++) {
      let start = window.performance.now();

      for (let i = 0; i < 25; i++) {
        this.generateRC(i);
        const roundKey = this.generateRoundKey();
        this.addRoundKey(roundKey);
        this.moduloAddition(roundKey);
        this.subColumn(this.cipherText);
        this.NonceXOR();
        this.shiftRow();
      }
      const roundKey = this.generateRoundKey(true);
      this.addRoundKey(roundKey);

      let end = window.performance.now();
      let time = end - start;
      totalTime += time;

      console.log(`Execution time: ${time} ms`);
    }

    console.log(`Average Execution time: ${totalTime / numberOfRuns} ms`);
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
}

const testCases = [
  {
    plaintext: [0x0000, 0x0000, 0x0000, 0x0000],
    key: [0x00000000, 0x00000000, 0x00000000, 0x00000000],
  },
  {
    plaintext: [0xffff, 0xffff, 0xffff, 0xffff],
    key: [0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff],
  },
];

testCases.forEach((testCase) => {
  console.log("\nStart test case\n");

  const newRectangle = new Rectangle(testCase.plaintext, testCase.key);

  console.log("Plain Text: ");
  newRectangle.plainText.forEach((row) =>
    process.stdout.write(row.toString(16).padStart(4, "0"))
  );
  console.log("\n-----------------------");

  console.log("Cipher Text: ");
  newRectangle.encrypt();
  newRectangle.cipherText.forEach((row) =>
    process.stdout.write(row.toString(16).padStart(4, "0"))
  );
  console.log("\n-----------------------");

  console.log("Plain Text after decryption: ");
  newRectangle.decrypt();
  newRectangle.cipherText.forEach((row) =>
    process.stdout.write(row.toString(16).padStart(4, "0"))
  );
  console.log("\n-----------------------");
});

module.exports = Rectangle;
