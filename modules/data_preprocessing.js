function plaintextAsciiToDecimal(text) {
  const decimalArray = [];
  let currentDecimalValue = 0;

  for (let i = 0; i < text.length; i++) {
    currentDecimalValue = currentDecimalValue * 256 + text.charCodeAt(i);
    if (i % 2 === 1) {
      decimalArray.push(currentDecimalValue);
      currentDecimalValue = 0;
    }
  }

  return decimalArray;
}

function ciphertextAsciiToDecimal(text) {
  const decimalArray = [];
  let currentDecimalValue = 0;

  for (let i = 0; i < text.length; i++) {
    currentDecimalValue = currentDecimalValue * 256 + text.charCodeAt(i);
    if (i % 4 === 3) {
      decimalArray.push(currentDecimalValue);
      currentDecimalValue = 0;
    }
  }

  return decimalArray;
}

function printInBinary(text) {
  text.forEach((row) =>
    process.stdout.write(row.toString(2).padStart(16, "0"))
  );
}

function printInHexa(text) {
  text.forEach((row) =>
    process.stdout.write(row.toString(16).padStart(4, "0"))
  );
}

module.exports = {
  plaintextAsciiToDecimal,
  ciphertextAsciiToDecimal,
  printInBinary,
  printInHexa,
};
