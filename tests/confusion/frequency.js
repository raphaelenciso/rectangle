//compare the original key to the 25 subkeys (128 bit)
const fs = require("fs");

const countBitDifferences = require("../../modules/countBitDiff");
const {
  hammingWeightTemplate,
} = require("../../modules/bit-difference-template");
const convertTo6Places = require("../../modules/decimal-6places-converter");

const Rectangle = require("../../algorithm/rectangle-128");
const ThreeDimensionalRectangle = require("../../algorithm/3d-rectangle-128-revamped");
const ModifiedKsaRectangle = require("../../algorithm/modified-ksa-rectangle-128");
const ModifiedRectangle = require("../../algorithm/modified/bbs-nonce-module-rectangle-revamp");

const hdkTestCases = require("../../data/hdk");
const ldkTestCases = require("../../data/ldk");
const rkTestCases = require("../../data/rk");
const testCases = require("../../data/testCases.json");

// const testCases = [
//   [0x00000000, 0x00000000, 0x00000000, 0x00000000],
//   [0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff],
// ];

let ciphertexts = "";

function writeFiles(algo) {
  fs.writeFileSync(
    // "../../" +
    `results/confusion/frequency/${algo}-ciphertexts.txt`,
    ciphertexts
  );
}

function runTestCase(testCases, algorithm = "rectangle") {
  ciphertexts = "";
  testCases.forEach((testCase) => {
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

    newRectangle.encrypt();

    newRectangle.cipherText.forEach((row) => {
      ciphertexts += row.toString(2).padStart(16, "0");
    });
    ciphertexts += "\n";
  });

  writeFiles(algorithm);
}

runTestCase(testCases, "rectangle");
runTestCase(testCases, "3d");
runTestCase(testCases, "modifiedKsa");
runTestCase(testCases, "modified");
