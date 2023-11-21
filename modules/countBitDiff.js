function countBitDifferences(binary1, binary2) {
  let count = 0;
  for (let i = 0; i < binary1.length; i++) {
    if (binary1[i] !== binary2[i]) {
      count++;
    }
  }
  return count;
}

module.exports = countBitDifferences;
