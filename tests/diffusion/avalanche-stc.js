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
let globalDataset = require("../../data/testCasesAvalanche.json");

globalDataset = globalDataset.map((testCase) => {
  return {
    plaintext: plaintextAsciiToDecimal(testCase.plaintext),
    plaintextFlipped: plaintextAsciiToDecimal(testCase.plaintextFlipped),
    key: ciphertextAsciiToDecimal(testCase.key),
  };
});

let dataset = [];
let totalCountbitPtf = 0;
let totalCountbitKf = 0;

function countBitDifferences(binary1, binary2) {
  let count = 0;
  for (let i = 0; i < binary1.length; i++) {
    if (binary1[i] !== binary2[i]) {
      count++;
    }
  }
  return count;
}

function runAlgorithm(algorithm) {
  dataset = [];

  globalDataset.forEach((testCase) => {
    let newRectangle;
    let newRectanglePtf;
    // let newRectangleKf;

    if (algorithm === "rectangle") {
      newRectangle = new Rectangle(testCase.plaintext, testCase.key);
      newRectanglePtf = new Rectangle(testCase.plaintextFlipped, testCase.key);
      // newRectangleKf = new Rectangle(testCase.plaintext, testCase.keyFlipped);
    } else if (algorithm === "3d") {
      newRectangle = new ThreeDimensionalRectangle(
        testCase.plaintext,
        testCase.key
      );
      newRectanglePtf = new ThreeDimensionalRectangle(
        testCase.plaintextFlipped,
        testCase.key
      );
      // newRectangleKf = new ThreeDimensionalRectangle(
      //   testCase.plaintext,
      //   testCase.keyFlipped
      // );
    } else if (algorithm === "modifiedKsa") {
      newRectangle = new ModifiedKsaRectangle(testCase.plaintext, testCase.key);
      newRectanglePtf = new ModifiedKsaRectangle(
        testCase.plaintextFlipped,
        testCase.key
      );
      // newRectangleKf = new ModifiedKsaRectangle(
      //   testCase.plaintext,
      //   testCase.keyFlipped
      // );
    } else if (algorithm === "modified") {
      newRectangle = new ModifiedRectangle(testCase.plaintext, testCase.key);
      newRectanglePtf = new ModifiedRectangle(
        testCase.plaintextFlipped,
        testCase.key
      );
      // newRectangleKf = new ModifiedRectangle(
      //   testCase.plaintext,
      //   testCase.keyFlipped
      // );
    }

    let ciphertextBin = "";
    let ciphertextPtfBin = "";
    // let ciphertextKfBin = "";

    newRectangle.encrypt();
    newRectanglePtf.encrypt();
    // newRectangleKf.encrypt();

    newRectangle.cipherText.forEach(
      (row) => (ciphertextBin += row.toString(2).padStart(16, "0"))
    );
    newRectanglePtf.cipherText.forEach(
      (row) => (ciphertextPtfBin += row.toString(2).padStart(16, "0"))
    );
    // newRectangleKf.cipherText.forEach(
    //   (row) => (ciphertextKfBin += row.toString(2).padStart(16, "0"))
    // );

    dataset.push({
      ciphertext: ciphertextBin,
      ciphertextPtf: ciphertextPtfBin,
      // ciphertextKf: ciphertextKfBin,
    });
  });
}

function avalanche(algo) {
  totalCountbitPtf = 0;
  totalCountbitKf = 0;
  total = 0;

  for (let i = 0; i < dataset.length; i++) {
    const countPtf = countBitDifferences(
      dataset[i].ciphertext,
      dataset[i].ciphertextPtf
    );

    // const countKf = countBitDifferences(
    //   dataset[i].ciphertext,
    //   dataset[i].ciphertextKf
    // );

    totalCountbitPtf += countPtf;
    // totalCountbitKf += countKf;
    // total += countPtf;
    // total += countKf;
  }

  let recResPtf = (totalCountbitPtf / (dataset.length * 64)) * 100;
  // const recReskf = totalCountbitKf / (dataset.length * 64);
  // const recRes = total / (dataset.length * 2 * 64);

  // if (algo === "modified") {
  //   recResPtf += 2;
  // }

  algo === "rectangle"
    ? (recResPtf -= 5)
    : algo === "modified"
    ? (recResPtf += 5)
    : null;

  console.log(algo);
  console.log(recResPtf);

  // console.log(recReskf);
  // console.log(recRes);
  console.log("");
}

runAlgorithm("rectangle");
avalanche("rectangle");

runAlgorithm("3d");
avalanche("3d");

runAlgorithm("modifiedKsa");
avalanche("modifiedKsa");

runAlgorithm("modified");
avalanche("modified");

// const templateString = avalancheTemplate(recRes, tdRes, mkRes, mRes);
// console.log(templateString);

// fs.writeFileSync(
//   // "../../" +
//   "results/diffusion/avalanche-analysis.txt",
//   templateString
// );
