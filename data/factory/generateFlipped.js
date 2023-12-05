const fs = require("fs");

const testCases = [];

function flipRandomBit(inputString) {
  // Check if the input string is exactly 8 characters
  if (inputString.length !== 8) {
    console.error("Input string must be 8 characters long.");
    return null;
  }

  // Choose a random index
  const randomIndex = Math.floor(Math.random() * 8);

  // Get the character at the random index
  const selectedChar = inputString.charAt(randomIndex);

  // Convert the character to binary
  const binaryValue = selectedChar.charCodeAt(0).toString(2);

  // Choose a random bit to flip
  const randomBitIndex = Math.floor(Math.random() * binaryValue.length);

  // Flip the selected bit
  const flippedBinaryValue =
    binaryValue.substring(0, randomBitIndex) +
    (binaryValue[randomBitIndex] === "0" ? "1" : "0") +
    binaryValue.substring(randomBitIndex + 1);

  // Convert the binary back to the character
  const flippedChar = String.fromCharCode(parseInt(flippedBinaryValue, 2));

  // Create a new string with the flipped character
  const resultString =
    inputString.substring(0, randomIndex) +
    flippedChar +
    inputString.substring(randomIndex + 1);

  return resultString;
}

function generateObject() {
  const plaintext = Math.random().toString(36).substring(2, 10);

  // Generate random key with 16 characters
  const key1 = Math.random().toString(36).substring(2, 10);
  const key2 = Math.random().toString(36).substring(2, 10);

  const key = key1 + key2;

  const plaintextFlipped = flipRandomBit(plaintext);

  return {
    plaintext,
    plaintextFlipped,
    key,
  };
}

function generate10k() {
  for (let i = 0; i < 100; i++) {
    testCases.push(generateObject());
  }
}

// Example usage
generate10k();
const samplesJSON = JSON.stringify(testCases, null, 2);
fs.writeFileSync("data/testCasesAvalanche.json", samplesJSON);
console.log(testCases); // { plaintext: '4g8p5x2q', key: '3796y4xaj2l01m5e4' }
