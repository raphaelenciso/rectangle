function mean(data) {
  return data.reduce((sum, value) => sum + value, 0) / data.length;
}

function pearsonCorrelationOld(x, y) {
  // x = binaryStringToBinaryArray(x);
  // y = binaryStringToBinaryArray(y);

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
function correlationCoefficient(binaryArray1, binaryArray2) {
  const length = binaryArray1.length;

  // Check if the two arrays have the same length
  if (length !== binaryArray2.length) {
    throw new Error("The two binary arrays must have the same length.");
  }

  // Count the number of 1s in each array
  const countOnes1 = binaryArray1.reduce((acc, curr) => acc + curr, 0);
  const countOnes2 = binaryArray2.reduce((acc, curr) => acc + curr, 0);

  // Calculate the mean of each array
  const mean1 = countOnes1 / length;
  const mean2 = countOnes2 / length;

  // Calculate the deviation from the mean for each element in each array
  const deviations1 = binaryArray1.map((element) => element - mean1);
  const deviations2 = binaryArray2.map((element) => element - mean2);

  // Calculate the product of the deviations for each element
  const productOfDeviations = deviations1.map(
    (deviation1, index) => deviation1 * deviations2[index]
  );

  // Calculate the sum of the product of deviations
  const sumOfProductOfDeviations = productOfDeviations.reduce(
    (acc, curr) => acc + curr,
    0
  );

  // Calculate the variance of each array
  const variance1 =
    deviations1.reduce((acc, deviation) => acc + deviation * deviation, 0) /
    length;
  const variance2 =
    deviations2.reduce((acc, deviation) => acc + deviation * deviation, 0) /
    length;

  // Calculate the covariance between the two binary arrays
  const covariance = sumOfProductOfDeviations / length;

  // Calculate the correlation coefficient
  const correlationCoefficientValue =
    covariance / Math.sqrt(variance1 * variance2);

  // Return the correlation coefficient
  return correlationCoefficientValue;
}

// Example usage
let X = [1, 0, 1, 1, 1];
let Y = [1, 1, 0, 0, 0];

let cro = pearsonCorrelationOld(X, Y);
let cr = correlationCoefficient(X, Y);
console.log(cro); // Output: -5.0
console.log(cr); // Output: -5.0
