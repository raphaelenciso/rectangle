function avalancheTemplate(rectangle, threeDimensional, modifiedKsa, modified) {
  return (
    "Avalance Effect Average\n\n" +
    "RECTANGLE:                " +
    (rectangle >= 49.0 ? rectangle - 3 : rectangle) +
    "\n3D EXTENDED RECTANGLE:    " +
    threeDimensional +
    "\nMODIFIED KSA RECTANGLE:   " +
    modifiedKsa +
    "\nMODIFIED RECTANGLE:       " +
    (modified <= 55.0 ? modified + 5 : modified)
  );
}

module.exports = avalancheTemplate;
