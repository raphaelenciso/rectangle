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

const globalDataset = require("./dataset.js");

let dataset = [];
let totalCountbit = 0;

function runAlgorithm(algorithm) {
  dataset = [];
  totalCountbit = 0;

  globalDataset.forEach((testCase) => {
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

function countBitDifferences(binary1, binary2, algo) {
  let count = 0;
  for (let i = 0; i < binary1.length; i++) {
    if (binary1[i] !== binary2[i]) {
      count++;
    }
  }

  // if (algo === "rectangle") {
  //   if (count >= 32) {
  //     count -= 3;
  //   }
  // } else if (algo === "3d") {
  //   if (count >= 32) {
  //     count -= -1;
  //   }
  // } else if (algo === "modifiedKsa") {
  //   if (count >= 32) {
  //     count -= 2;
  //   }
  // } else if (algo === "modified") {
  //   if (count <= 32) {
  //     count += 5;
  //   }
  // }

  return count;
}

runAlgorithm("rectangle");
for (let i = 0; i < dataset.length - 1; i++) {
  const count = countBitDifferences(
    dataset[0].ciphertext,
    dataset[i + 1].ciphertext,
    "rectangle"
  );

  totalCountbit += count;
}
const recRes = totalCountbit / ((dataset.length - 1) * 64);

runAlgorithm("3d");
for (let i = 0; i < dataset.length - 1; i++) {
  const count = countBitDifferences(
    dataset[0].ciphertext,
    dataset[i + 1].ciphertext,
    "3d"
  );

  totalCountbit += count;
}
const tdRes = totalCountbit / ((dataset.length - 1) * 64);

runAlgorithm("modifiedKsa");
for (let i = 0; i < dataset.length - 1; i++) {
  const count = countBitDifferences(
    dataset[0].ciphertext,
    dataset[i + 1].ciphertext,
    "modifiedKsa"
  );

  totalCountbit += count;
}
const mkRes = totalCountbit / ((dataset.length - 1) * 64);

runAlgorithm("modified");
for (let i = 0; i < dataset.length - 1; i++) {
  const count = countBitDifferences(
    dataset[0].ciphertext,
    dataset[i + 1].ciphertext,
    "modified"
  );

  // console.log("Avalanche ciphertext " + i + ": " + count / 64);
  // totalCountbit += count;
  totalCountbit += count;
}
const mRes = totalCountbit / ((dataset.length - 1) * 64);

const templateString = avalancheTemplate(
  recRes * 100,
  tdRes * 100,
  mkRes * 100,
  mRes * 100
);
console.log(templateString);

// fs.writeFileSync(
//   // "../../" +
//   "results/diffusion/avalanche-analysis.txt",
//   templateString
// );
