//compare the original key to the 25 subkeys (128 bit)
const fs = require("fs");

const countBitDifferences = require("../../modules/countBitDiff");
const { bitDifTemplate } = require("../../modules/bit-difference-template");
const convertTo6Places = require("../../modules/decimal-6places-converter");

const Rectangle = require("../../algorithm/rectangle-128");
const ThreeDimensionalRectangle = require("../../algorithm/3d-rectangle-128-revamped");
const ModifiedKsaRectangle = require("../../algorithm/modified-ksa-rectangle-128");
const ModifiedRectangle = require("../../algorithm/modified/bbs-nonce-module-rectangle-revamp");

const hdkTestCases = require("../../data/hdk");
const ldkTestCases = require("../../data/ldk");
const rkTestCases = require("../../data/rk");
// const testCases = require("../../data/testCases.json");

// const testCases = [
//   [0x00000000, 0x00000000, 0x00000000, 0x00000000],
//   [0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff],
// ];

function runTestCase(testCases, keys = 0, algorithm = "rectangle") {
  let testCasePercentBitDiff = 0;
  let bits = 64;

  testCases.forEach((testCase) => {
    let newRectangle;

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

    let sumOfBitDiff = 0;
    for (let i = 0; i < roundkeys.length - 1; i++) {
      const count = countBitDifferences(roundkeys[i], roundkeys[i + 1]);
      sumOfBitDiff += count;
    }

    const percentBitDiff = sumOfBitDiff / 25 / bits;
    // const withAbs = 0.5 - Math.abs(0.5 - percentBitDiff);
    // console.log(withAbs);
    // console.log(percentBitDiff);
    testCasePercentBitDiff += percentBitDiff;
  });

  const avgTestCasePercentBitDiff = testCasePercentBitDiff / testCases.length;
  // console.log("avg: " + avgTestCasePercentBitDiff.toFixed(6));

  return convertTo6Places(avgTestCasePercentBitDiff);
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

const templateString = bitDifTemplate(rData, tdData, mkData, mData);
console.log(templateString);

fs.writeFileSync(
  // "../../" +
  "results/non-robust/bit-difference-analysis.txt",
  templateString
);
