const fs = require("fs");
const plaintexts = require("../../data/plaintexts.json");
// const keys = require("../../data/keys.json");
const Rectangle = require("../../algorithm/rectangle-128");
const ThreeDimensionalRectangle = require("../../algorithm/3d-rectangle-128-revamped");
const ModifiedKsaRectangle = require("../../algorithm/modified-ksa-rectangle-128");
const ModifiedRectangle = require("../../algorithm/modified/bbs-nonce-module-rectangle-revamp");

const correlationTemplate = require("../../modules/correaltion-revamp-template");

// const plaintexts = [
//   [54409, 34902, 47868, 9866],
//   // [58495, 2502, 12959, 46250],
// ];

// [4] 01000000

// 0xc6b8cf09

// const keys = [
//   [2862574150, 3334000393, 2597855726, 2043861579],
//   [2597855726, 3334000393, 2862574150, 2043861579],
// ];

// const key = [2862574150, 3334000393, 2597855726, 2043861579];
const key = [2597855726, 3334000393, 2862574150, 2043861579];

let processedDataKey = [];

//generate data of plaintext and ciphertexts
function generatePlaintextsAndCiphertexts(algorithm = "rectangle") {
  processedDataKey = [];

  plaintexts.forEach((plaintext) => {
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
    let ciphertextBin = "";

    newRectangle.plainText.forEach(
      (row) => (plaintextBin += row.toString(2).padStart(16, "0"))
    );
    newRectangle.encrypt();

    newRectangle.cipherText.forEach(
      (row) => (ciphertextBin += row.toString(2).padStart(16, "0"))
    );

    processedDataKey.push({
      plaintext: plaintextBin,
      ciphertext: ciphertextBin,
    });

    plaintextBin = "";
    ciphertextBin = "";
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

function calculateCorrelationCoefficient() {
  var avgPcc = 0;
  let nlr = 0;
  let wp = 0;
  let mp = 0;
  let sp = 0;
  let pp = 0;

  let data = processedDataKey;

  for (let i = 0; i < data.length; i++) {
    const correlationCoefficient = pearsonCorrelation(
      data[i].plaintext,
      data[i].ciphertext
    );

    if (correlationCoefficient === 0) {
      nlr++;
      // wp++;
    } else if (
      Math.abs(correlationCoefficient) > 0 &&
      Math.abs(correlationCoefficient) <= 0.3
    ) {
      wp++;
    } else if (
      Math.abs(correlationCoefficient) > 0.3 &&
      Math.abs(correlationCoefficient) < 0.7
    ) {
      mp++;
    } else if (
      Math.abs(correlationCoefficient) >= 0.7 &&
      Math.abs(correlationCoefficient) < 1
    ) {
      sp++;
    } else if (correlationCoefficient === 1 || correlationCoefficient === -1) {
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

generatePlaintextsAndCiphertexts("rectangle");
const rect = calculateCorrelationCoefficient();

generatePlaintextsAndCiphertexts("3d");
const td = calculateCorrelationCoefficient();

generatePlaintextsAndCiphertexts("modifiedKsa");
const mk = calculateCorrelationCoefficient();

generatePlaintextsAndCiphertexts("modified");
const m = calculateCorrelationCoefficient();

const templateString = correlationTemplate(rect, td, mk, m);
console.log(templateString);

fs.writeFileSync(
  // "../../" +
  "results/confusion/correlation-analysis.txt",
  templateString
);
