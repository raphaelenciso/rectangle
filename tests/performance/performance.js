const fs = require("fs");
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();

const testCases = require("../../data/testCases.json");

const Rectangle = require("../../algorithm/rectangle-128");
const ThreeDimensionalRectangle = require("../../algorithm/3d-rectangle-128-revamped");
const ModifiedKsaRectangle = require("../../algorithm/modified-ksa-rectangle-128");
const ModifiedRectangle = require("../../algorithm/modified/bbs-nonce-module-rectangle-revamp");
const performanceTemplate = require("../../modules/performance-template");

function testPerformance(algorithm = "rectangle") {
  let totalTime = 0;

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

    let start = window.performance.now();
    newRectangle.encrypt();
    let end = window.performance.now();

    let time = end - start;
    totalTime += time;

    // console.log(`Execution time: ${time} ms`);
  });

  return {
    speed: totalTime / testCases.length,
    throughput: 64 / (totalTime / testCases.length),
  };
}

const res1 = testPerformance("rectangle");
const res2 = testPerformance("3d");
const res3 = testPerformance("modifiedKsa");
const res4 = testPerformance("modified");

const templateString = performanceTemplate(res1, res2, res3, res4);
console.log(templateString);

fs.writeFileSync(
  // "../../" +
  "results/performance/performance-analysis.txt",
  templateString
);
