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

const testCases = require("../../data/testCases.json");

const testCasesPlaintexts = testCases.map((testCase) => testCase.plaintext);
const plaintexts = require("../../data/plaintexts.json");
const key = [2597855726, 3334000393, 2862574150, 2043861579];

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
      newRectangle = new Rectangle(testCase, key);
    } else if (algorithm === "3d") {
      newRectangle = new ThreeDimensionalRectangle(testCase, key);
    } else if (algorithm === "modifiedKsa") {
      newRectangle = new ModifiedKsaRectangle(testCase, key);
    } else if (algorithm === "modified") {
      newRectangle = new ModifiedRectangle(testCase, key);
    }

    newRectangle.encrypt();

    newRectangle.cipherText.forEach((row) => {
      ciphertexts += row.toString(2).padStart(16, "0");
    });
    ciphertexts += "\n";
  });

  writeFiles(algorithm);
}

// runTestCase(plaintexts, "rectangle");
// runTestCase(plaintexts, "3d");
// runTestCase(plaintexts, "modifiedKsa");
// runTestCase(plaintexts, "modified");

runTestCase(testCasesPlaintexts, "rectangle");
runTestCase(testCasesPlaintexts, "3d");
runTestCase(testCasesPlaintexts, "modifiedKsa");
runTestCase(testCasesPlaintexts, "modified");
