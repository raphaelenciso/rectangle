const fs = require("fs");

const testCases = [];

function generateObject() {
  // Generate random plaintext with 8 characters
  const plaintext = Math.random().toString(36).substring(2, 10);

  // Generate random key with 16 characters
  const key1 = Math.random().toString(36).substring(2, 10);
  const key2 = Math.random().toString(36).substring(2, 10);

  const key = key1 + key2;

  return {
    plaintext,
    key,
  };
}

function generate10k() {
  for (let i = 0; i < 10000; i++) {
    testCases.push(generateObject());
  }
}

// Example usage
generate10k();
const samplesJSON = JSON.stringify(testCases, null, 2);
fs.writeFileSync("data/testCases2.json", samplesJSON);
console.log(testCases); // { plaintext: '4g8p5x2q', key: '3796y4xaj2l01m5e4' }
