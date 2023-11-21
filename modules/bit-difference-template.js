function printAlgoResult(title, data) {
  return (
    "\n\n=============================================\n" +
    title +
    "\n" +
    "=============================================" +
    "\nHDK:  " +
    data.hdk +
    "\nLDK:  " +
    data.ldk +
    "\nRK:   " +
    data.rk +
    "\nAVG:  " +
    data.ravg
  );
}

function bitDifTemplate(rData, tdData, mkData, mData) {
  return (
    "Bit Difference Results" +
    printAlgoResult("RECTANGLE", rData) +
    printAlgoResult("3D EXTENDED RECTANGLE", tdData) +
    printAlgoResult("MODIFIED KSA RECTANGLE", mkData) +
    printAlgoResult("MODIFIED RECTANGLE", mData)
  );
}

function bitIndTemplate(rData, tdData, mkData, mData) {
  return (
    "Bit Independence Results" +
    printAlgoResult("RECTANGLE", rData) +
    printAlgoResult("3D EXTENDED RECTANGLE", tdData) +
    printAlgoResult("MODIFIED KSA RECTANGLE", mkData) +
    printAlgoResult("MODIFIED RECTANGLE", mData)
  );
}

function hammingWeightTemplate(rData, tdData, mkData, mData) {
  return (
    "Hamming Weight Results" +
    printAlgoResult("RECTANGLE", rData) +
    printAlgoResult("3D EXTENDED RECTANGLE", tdData) +
    printAlgoResult("MODIFIED KSA RECTANGLE", mkData) +
    printAlgoResult("MODIFIED RECTANGLE", mData)
  );
}

module.exports = { bitDifTemplate, bitIndTemplate, hammingWeightTemplate };
