const fs = require("fs");
const plaintexts = require("../../data/plaintexts.json");
// const keys = require("../../data/keys.json");
const Rectangle = require("../../algorithm/rectangle-128.js");
const ThreeDimensionalRectangle = require("../../algorithm/3d-rectangle-128-revamped.js");
const ModifiedKsaRectangle = require("../../algorithm/modified-ksa-rectangle-128.js");
const ModifiedRectangle = require("../../algorithm/modified/bbs-nonce-module-rectangle-revamp.js");

const correlationTemplate = require("../../modules/correlation-template.js");
const { log } = require("console");

// const plaintexts = [
//   [54409, 34902, 47868, 9866],
//   // [58495, 2502, 12959, 46250],
// ];

// [4] 01000000

// 0xc6b8cf09

const keys = [
  [0xffffffff, 0xffffffff, 0xffffffff, 0xfffffffe],
  [0x00000000, 0x00000000, 0x00000000, 0x00000001],
  [0xc6b8cf09, 0xaa9f6a42, 0xb992da4a, 0x9ad821ee],
];

//index 0 = hdk, 1 = ldk, 2 = rk
let correlationResults = [[], [], []];

//generate data of plaintext and ciphertexts
function generateCorrelationResults(algorithm = "rectangle") {
  correlationResults = [[], [], []];

  keys.forEach((key, j) => {
    plaintexts.forEach((plaintext) => {
      // const newRectangle = new Rectangle(plaintext, key);

      let newRectangle;

      if (algorithm === "rectangle") {
        newRectangle = new Rectangle(plaintext, key);
      } else if (algorithm === "3d") {
        newRectangle = new ThreeDimensionalRectangle(plaintext, key);
      } else if (algorithm === "modifiedKsa") {
        newRectangle = new ModifiedKsaRectangle(plaintext, key);
      } else if (algorithm === "modified") {
        newRectangle = new ModifiedRectangle(plaintext, key);
      }

      let plaintextBin = "";

      newRectangle.plainText.forEach(
        (row) => (plaintextBin += row.toString(2).padStart(16, "0"))
      );
      let ciphertexts = newRectangle.encrypt(2.1);

      let totalCor = 0;
      ciphertexts.forEach((ciphertext) => {
        const corRes = pearsonCorrelation(plaintextBin, ciphertext);
        totalCor += Math.abs(corRes);
      });

      let avgCor = totalCor / ciphertexts.length;

      correlationResults[j].push(avgCor);

      plaintextBin = "";
      ciphertexts = [];
    });

    // const sampleJson = JSON.stringify(processedDataKey[j], null, 2);
    // fs.writeFileSync(`data/key${j + 1}.json`, sampleJson);
  });
}

function binaryStringToBinaryArray(binaryString) {
  const binaryArray = [];

  for (let i = 0; i < binaryString.length; i++) {
    binaryArray.push(parseInt(binaryString[i]));
  }

  return binaryArray;
}

function mean(data) {
  return data.reduce((sum, value) => sum + value, 0) / data.length;
}

function pearsonCorrelation(x, y) {
  x = binaryStringToBinaryArray(x);
  y = binaryStringToBinaryArray(y);

  if (x.length !== y.length) {
    throw new Error("Input arrays must have the same length");
  }

  const n = x.length;

  // Calculate the means of x and y
  const meanX = mean(x);
  const meanY = mean(y);

  // Calculate the covariance and variances
  let covariance = 0;
  let varianceX = 0;
  let varianceY = 0;

  for (let i = 0; i < n; i++) {
    covariance += (x[i] - meanX) * (y[i] - meanY);
    varianceX += (x[i] - meanX) ** 2;
    varianceY += (y[i] - meanY) ** 2;
  }

  // Calculate the Pearson correlation coefficient
  const correlation =
    covariance / (Math.sqrt(varianceX) * Math.sqrt(varianceY));
  return correlation;
}

function calculateCorrelationCoefficient(key) {
  let nlr = 0;
  let wp = 0;
  let mp = 0;
  let sp = 0;
  let pp = 0;

  let data = [];

  if (key === "hdk") {
    data = correlationResults[0];
  } else if (key === "ldk") {
    data = correlationResults[1];
  } else if (key === "rk") {
    data = correlationResults[2];
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i] === 0) {
      nlr++;
    } else if (Math.abs(data[i]) > 0 && Math.abs(data[i]) <= 0.3) {
      wp++;
    } else if (Math.abs(data[i]) > 0.3 && Math.abs(data[i]) < 0.7) {
      mp++;
    } else if (Math.abs(data[i]) >= 0.7 && Math.abs(data[i]) < 1) {
      sp++;
    } else if (data[i] === 1 || data[i] === -1) {
      pp++;
    }
  }

  data = [];

  return (
    "Non-linear relationship: " +
    nlr +
    "\n" +
    "Weak positive: " +
    wp +
    "\n" +
    "Moderate positive: " +
    mp +
    "\n" +
    "Strong positive: " +
    sp +
    "\n" +
    "Perfect positive: " +
    pp +
    "\n\n"
  );
}

generateCorrelationResults("3d");
const rhdkRes = calculateCorrelationCoefficient("hdk");
const rldkRes = calculateCorrelationCoefficient("ldk");
const rrkRes = calculateCorrelationCoefficient("rk");
console.log(rhdkRes, rldkRes, rrkRes);
// const recRes = { rhdkRes, rldkRes, rrkRes };

// generatePlaintextsAndCiphertexts("3d");
// const tdHdkRes = calculateCorrelationCoefficient("hdk");
// const tdLdkRes = calculateCorrelationCoefficient("ldk");
// const tdRkRes = calculateCorrelationCoefficient("rk");
// const tdRes = { tdHdkRes, tdLdkRes, tdRkRes };

// generatePlaintextsAndCiphertexts("modifiedKsa");
// const mkHdkRes = calculateCorrelationCoefficient("hdk");
// const mkLdkRes = calculateCorrelationCoefficient("ldk");
// const mkRkRes = calculateCorrelationCoefficient("rk");
// const mkRes = { mkHdkRes, mkLdkRes, mkRkRes };

// generatePlaintextsAndCiphertexts("modified");
// const mHdkRes = calculateCorrelationCoefficient("hdk");
// const mLdkRes = calculateCorrelationCoefficient("ldk");
// const mRkRes = calculateCorrelationCoefficient("rk");
// const rRes = { mHdkRes, mLdkRes, mRkRes };

// const templateString = correlationTemplate(recRes, tdRes, mkRes, rRes);
// console.log(templateString);

// fs.writeFileSync(
//   // "../../" +
//   "results/confusion/correlation-analysis.txt",
//   templateString
// );
