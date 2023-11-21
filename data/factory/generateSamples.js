const fs = require("fs");

function getNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSamples() {
  let sampleSize = [];

  for (i = 0; i < 10000; i++) {
    let plaintext = [];
    for (let j = 0; j < 4; j++) {
      plaintext.push(getNum(1, 65535));
    }

    let key = [];
    for (let j = 0; j < 4; j++) {
      key.push(getNum(1, 4294967295));
    }

    sampleSize.push({ plaintext: plaintext, key: key });
  }

  const samplesJSON = JSON.stringify(sampleSize, null, 2);
  fs.writeFileSync("data/testCases.json", samplesJSON);
}

generateSamples();
