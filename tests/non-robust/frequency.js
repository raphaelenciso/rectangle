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

let rKeys = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

function resetRKeys() {
  rKeys = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];
}

function writeFiles(algo) {
  for (let i = 0; i < 25; i++) {
    fs.writeFileSync(
      // "../../" +
      `results/non-robust/frequency/${algo}/round${i + 1}-keys.txt`,
      rKeys[i]
    );
  }
}

function runTestCase(testCases, keys = 0, algorithm = "rectangle") {
  resetRKeys();
  testCases.forEach((testCase) => {
    let newRectangle;

    if (algorithm === "rectangle") {
      newRectangle = new Rectangle(
        [0x0000, 0x0000, 0x0000, 0x0000],
        testCase.key
      );
    } else if (algorithm === "modifiedKsa") {
      newRectangle = new ModifiedKsaRectangle(
        [0x0000, 0x0000, 0x0000, 0x0000],
        testCase.key
      );
    } else if (algorithm === "modified") {
      newRectangle = new ModifiedRectangle(
        [0x0000, 0x0000, 0x0000, 0x0000],
        testCase.key
      );
    }

    //1.1 return roundkeys 1.2 for subkeys
    const roundkeys = newRectangle.encrypt(keys);

    for (let i = 1; i < roundkeys.length; i++) {
      rKeys[i - 1] += roundkeys[i] + "\n";
    }
  });

  writeFiles(algorithm);
}

runTestCase(testCases, 1.1, "rectangle");
runTestCase(testCases, 1.1, "modifiedKsa");
runTestCase(testCases, 1.1, "modified");

// runTestCase(testCases, 1.1, "modifiedKsa");
// runTestCase(testCases, 1.1, "modified");
