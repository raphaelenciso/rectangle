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

console.log(generateHighDensityDecimalValue().toString(2).padStart(16, "0"));
console.log(generateLowDensityDecimalValue().toString(2).padStart(16, "0"));
