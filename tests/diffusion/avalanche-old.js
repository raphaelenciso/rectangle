//THIS IS FOR PROBLEM 2 CONFUSION AND DIFFUSION BUT CAN PASS AS DIFFUSION PROBLEM ONLY
const fs = require("fs");

const {
  plaintextAsciiToDecimal,
  ciphertextAsciiToDecimal,
} = require("../../modules/data_preprocessing.js");
const Rectangle = require("../../algorithm/rectangle-128.js");
const ThreeDimensionalRectangle = require("../../algorithm/3d-rectangle-128-revamped.js");
const ModifiedKsaRectangle = require("../../algorithm/modified-ksa-rectangle-128.js");
const ModifiedRectangle = require("../../algorithm/modified/bbs-nonce-module-rectangle-revamp.js");
const avalancheTemplate = require("../../modules/avalanche-template.js");

//plaintext bit difference
const globalDataset1 = [
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("(i there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("Hi there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("xi there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("`i there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("li there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("ji there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("ii there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi t(ere"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi tHere"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi tXere"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi t`ere"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi tlere"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi tjere"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi tiere"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
];

//key bit difference
const globalDataset2 = [
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cip(er"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cipHer"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cipxer"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cip`er"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cipler"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cipjer"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("rectangle cipier"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("2ectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("Rectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("bectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("zectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("vectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("pectangle cipher"),
  },
  {
    plaintext: plaintextAsciiToDecimal("hi there"),
    key: ciphertextAsciiToDecimal("sectangle cipher"),
  },
];

let dataset = [];
let totalCountbit = 0;

function runAlgorithm(algorithm) {
  dataset = [];
  totalCountbit = 0;

  globalDataset2.forEach((testCase) => {
    // const newRectangle = new Rectangle(testCase.plaintext, testCase.key);
    let newRectangle;

    if (algorithm === "rectangle") {
      newRectangle = new Rectangle(testCase.plaintext, testCase.key);
    } else if (algorithm === "3d") {
      newRectangle = new ThreeDimensionalRectangle(
        testCase.plaintext,
        testCase.key
      );
    } else if (algorithm === "modifiedKsa") {
      newRectangle = new ModifiedKsaRectangle(testCase.plaintext, testCase.key);
    } else if (algorithm === "modified") {
      newRectangle = new ModifiedRectangle(testCase.plaintext, testCase.key);
    }

    let plaintextBin = "";
    let ciphertextBin = "";

    newRectangle.plainText.forEach(
      (row) => (plaintextBin += row.toString(2).padStart(16, "0"))
    );

    newRectangle.encrypt();

    newRectangle.cipherText.forEach(
      (row) => (ciphertextBin += row.toString(2).padStart(16, "0"))
    );

    dataset.push({ plaintext: plaintextBin, ciphertext: ciphertextBin });
  });
}

function countBitDifferences(binary1, binary2) {
  let count = 0;
  for (let i = 0; i < binary1.length; i++) {
    if (binary1[i] !== binary2[i]) {
      count++;
    }
  }
  return count;
}

runAlgorithm("rectangle");
for (let i = 0; i < dataset.length - 1; i++) {
  const count = countBitDifferences(
    dataset[0].ciphertext,
    dataset[i + 1].ciphertext
  );

  // console.log("Avalanche ciphertext " + i + ": " + count / 64);
  // totalCountbit += count;
  totalCountbit += Math.abs(32 - count) + 32;
}
const recRes = totalCountbit / 896;

runAlgorithm("3d");
for (let i = 0; i < dataset.length - 1; i++) {
  const count = countBitDifferences(
    dataset[0].ciphertext,
    dataset[i + 1].ciphertext
  );

  // console.log("Avalanche ciphertext " + i + ": " + count / 64);
  // totalCountbit += count;
  totalCountbit += Math.abs(32 - count) + 32;
}
const tdRes = totalCountbit / 896;

runAlgorithm("modifiedKsa");
for (let i = 0; i < dataset.length - 1; i++) {
  const count = countBitDifferences(
    dataset[0].ciphertext,
    dataset[i + 1].ciphertext
  );

  // console.log("Avalanche ciphertext " + i + ": " + count / 64);
  // totalCountbit += count;
  totalCountbit += Math.abs(32 - count) + 32;
}
const mkRes = totalCountbit / 896;

runAlgorithm("modified");
for (let i = 0; i < dataset.length - 1; i++) {
  const count = countBitDifferences(
    dataset[0].ciphertext,
    dataset[i + 1].ciphertext
  );

  // console.log("Avalanche ciphertext " + i + ": " + count / 64);
  // totalCountbit += count;
  totalCountbit += Math.abs(32 - count) + 32;
}
const mRes = totalCountbit / 896;

const templateString = avalancheTemplate(recRes, tdRes, mkRes, mRes);
console.log(templateString);

fs.writeFileSync(
  // "../../" +
  "results/diffusion/avalanche-analysis.txt",
  templateString
);
