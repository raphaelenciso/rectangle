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

const testCases = [
  [0x00000000, 0x00000000, 0x00000000, 0x00000000],
  [0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff],
];

function hammingWeight(bitString) {
  let weight = 0;
  for (let i = 0; i < bitString.length; i++) {
    if (bitString[i] === "1") {
      weight++;
    }
  }

  return weight;
}

function runTestCase(testCases, keys = 0, algorithm = "rectangle") {
  let sumHammingWeight = 0;

  testCases.forEach((testCase) => {
    let newRectangle;
    let allRoundKeys = "";

    if (algorithm === "rectangle") {
      newRectangle = new Rectangle([0x0000, 0x0000, 0x0000, 0x0000], testCase);
    } else if (algorithm === "3d") {
      newRectangle = new ThreeDimensionalRectangle(
        [0x0000, 0x0000, 0x0000, 0x0000],
        testCase
      );
    } else if (algorithm === "modifiedKsa") {
      newRectangle = new ModifiedKsaRectangle(
        [0x0000, 0x0000, 0x0000, 0x0000],
        testCase
      );
    } else if (algorithm === "modified") {
      newRectangle = new ModifiedRectangle(
        [0x0000, 0x0000, 0x0000, 0x0000],
        testCase
      );
    }

    //1.1 return roundkeys 1.2 for subkeys
    const roundkeys = newRectangle.encrypt(keys);

    for (let i = 1; i < roundkeys.length; i++) {
      allRoundKeys += roundkeys[i];
    }

    const hamWeight = hammingWeight(allRoundKeys) / allRoundKeys.length;
    sumHammingWeight += hamWeight;
  });

  return convertTo6Places(sumHammingWeight / testCases.length);
}

function runAlgo(algo) {
  const hdk = runTestCase(hdkTestCases, 1.1, algo);
  const ldk = runTestCase(rkTestCases, 1.1, algo);
  const rk = runTestCase(ldkTestCases, 1.1, algo);
  const ravg = convertTo6Places((hdk + ldk + rk) / 3);

  return {
    hdk,
    ldk,
    rk,
    ravg,
  };
}

const rData = runAlgo("rectangle");
const tdData = runAlgo("3d");
const mkData = runAlgo("modifiedKsa");
const mData = runAlgo("modified");

const templateString = hammingWeightTemplate(rData, tdData, mkData, mData);
console.log(templateString);

fs.writeFileSync(
  // "../../" +
  "results/non-robust/hamming-weight-analysis.txt",
  templateString
);
