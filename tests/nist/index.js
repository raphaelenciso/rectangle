const fs = require("fs");

const Rectangle = require("../../algorithm/rectangle-128");
const ModifiedRectangle = require("../../algorithm/modified/bbs-nonce-module-rectangle");
const testCases = require("../../data/testCases.json");

let rectangleSampleSizeBinary = "";
let modifiedRectangleSampleSizeBinary = "";

testCases.forEach((testCase) => {
  const newRectangle = new Rectangle(testCase.plaintext, testCase.key);
  newRectangle.encrypt();

  newRectangle.cipherText.forEach((row) => {
    rectangleSampleSizeBinary += row.toString(2).padStart(16, "0");
  });

  rectangleSampleSizeBinary += "\n";
});

testCases.forEach((testCase) => {
  const newRectangle = new ModifiedRectangle(testCase.plaintext, testCase.key);
  newRectangle.encrypt();

  newRectangle.cipherText.forEach((row) => {
    modifiedRectangleSampleSizeBinary += row.toString(2).padStart(16, "0");
  });

  modifiedRectangleSampleSizeBinary += "\n";
});

fs.writeFileSync(
  "results/nist/samplesize-rectangle.txt",
  rectangleSampleSizeBinary
);
fs.writeFileSync(
  "results/nist/samplesize-modified-rectangle.txt",
  modifiedRectangleSampleSizeBinary
);
