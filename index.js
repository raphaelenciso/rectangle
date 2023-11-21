// const transformBitPatterns = (decimalArray, newIndexArrays) => {
//   const binaryArray = decimalArray.map((decimalValue) => {
//     return decimalValue.toString(2).padStart(16, "0");
//   });

//   transformedBitPatterns = [];
//   for (let i = 0; i < binaryArray.length; i++) {
//     const binaryString = binaryArray[i];
//     const newIndexArray = newIndexArrays[i];

//     transformedBitPattern = [];
//     for (let j = 0; j < newIndexArray.length; j++) {
//       transformedBitPattern.push(binaryString[newIndexArray[j]]);
//     }

//     transformedBitPatterns.push(transformedBitPattern.join(""));
//   }

//   return transformedBitPatterns;
// };

// function binaryArrayToBinaryString(binaryArray) {
//   let binaryString = "";

//   for (let bit of binaryArray) {
//     binaryString += bit.toString();
//   }

//   return binaryString;
// }

const cipherText = new Uint16Array([34801, 41192, 25902, 52777]);
const rotation3d = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3],
  [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  [3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12],
];

function binaryStringToBinaryArray(binaryString) {
  const binaryArray = [];

  for (let char of binaryString) {
    binaryArray.push(parseInt(char));
  }

  return binaryArray;
}

function rectangleBinaryToUint16Array(rectangleBinary) {
  const binaryString = rectangleBinary.map((row) => row.join("")).join("");
  const uint16Array = new Uint16Array(
    binaryString.match(/.{1,16}/g).map((binStr) => parseInt(binStr, 2))
  );

  return uint16Array;
}

function convertToBinaryString(arr) {
  return [
    arr[0].toString(2).padStart(16, "0"),
    arr[1].toString(2).padStart(16, "0"),
    arr[2].toString(2).padStart(16, "0"),
    arr[3].toString(2).padStart(16, "0"),
  ];
}

function threeDimensionBitRotation() {
  let binStringCiphertext = convertToBinaryString(cipherText);

  let rotatedArr = [
    binaryStringToBinaryArray(binStringCiphertext[0]),
    binaryStringToBinaryArray(binStringCiphertext[1]),
    binaryStringToBinaryArray(binStringCiphertext[2]),
    binaryStringToBinaryArray(binStringCiphertext[3]),
  ];

  for (let i = 0; i < 16; i++) {
    rotatedArr[0][i] = binStringCiphertext[0][rotation3d[0][i]];
  }

  for (let i = 0; i < 16; i++) {
    rotatedArr[1][i] = binStringCiphertext[1][rotation3d[1][i]];
  }

  for (let i = 0; i < 16; i++) {
    rotatedArr[2][i] = binStringCiphertext[2][rotation3d[2][i]];
  }

  for (let i = 0; i < 16; i++) {
    rotatedArr[3][i] = binStringCiphertext[3][rotation3d[3][i]];
  }

  let finalCiphertext = rotatedArr;
  for (let i = 0; i < 4; i++) {
    finalCiphertext[i] = rotatedArr[3 - i];
  }

  return rectangleBinaryToUint16Array(finalCiphertext);
}

const rotatedArr = threeDimensionBitRotation();

// threeDimensionBitRotation();

// console.log(newIndexArrays[1][0]);
