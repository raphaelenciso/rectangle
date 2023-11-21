const fs = require("fs");

function getNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateHighDensityDecimalValue() {
  let decimalValue = "";

  for (let i = 0; i < 16; i++) {
    if (Math.random() < 0.98) {
      decimalValue += "1";
    } else {
      decimalValue += "0";
    }
  }

  return parseInt(decimalValue, 2);
}

function generateLowDensityDecimalValue() {
  let decimalValue = "";

  for (let i = 0; i < 16; i++) {
    if (Math.random() < 0.02) {
      decimalValue += "1";
    } else {
      decimalValue += "0";
    }
  }

  return parseInt(decimalValue, 2);
}

function generateSamples() {
  let plaintexts = [];

  // for (i = 0; i < 1000; i++) {
  //   let plaintext = [];
  //   for (let j = 0; j < 4; j++) {
  //     plaintext.push(generateHighDensityDecimalValue());
  //   }

  //   while (
  //     plaintext[0] === 65535 &&
  //     plaintext[1] === 65535 &&
  //     plaintext[2] === 65535 &&
  //     plaintext[3] === 65535
  //   ) {
  //     plaintext = [];
  //     for (let j = 0; j < 4; j++) {
  //       plaintext.push(generateHighDensityDecimalValue());
  //     }
  //   }

  //   plaintexts.push(plaintext);
  // }

  // for (i = 0; i < 1000; i++) {
  //   let plaintext = [];
  //   for (let j = 0; j < 4; j++) {
  //     plaintext.push(generateLowDensityDecimalValue());
  //   }

  //   while (
  //     plaintext[0] === 0 &&
  //     plaintext[1] === 0 &&
  //     plaintext[2] === 0 &&
  //     plaintext[3] === 0
  //   ) {
  //     plaintext = [];
  //     for (let j = 0; j < 4; j++) {
  //       plaintext.push(generateLowDensityDecimalValue());
  //     }
  //   }

  //   plaintexts.push(plaintext);
  // }

  for (i = 0; i < 1000; i++) {
    let plaintext = [];
    for (let j = 0; j < 4; j++) {
      plaintext.push(getNum(1, 65535));
    }

    plaintexts.push(plaintext);
  }

  const plaintextsJSON = JSON.stringify(plaintexts, null, 2);
  fs.writeFileSync("data/plaintexts.json", plaintextsJSON);
}

generateSamples();
