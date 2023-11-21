function correlationTemplate(
  rectangle,
  threeDimensional,
  modifiedKsa,
  modified
) {
  return (
    "========================================\n" +
    "RECTANGLE  \n" +
    "========================================\n" +
    rectangle +
    "========================================\n" +
    "3D EXTENDED RECTANGLE\n" +
    "========================================\n" +
    threeDimensional +
    "========================================\n" +
    "MODIFIED KSA RECTANGLE\n" +
    "========================================\n" +
    modifiedKsa +
    "========================================\n" +
    "MODIFIED RECTANGLE\n" +
    "========================================\n" +
    modified
  );
}

module.exports = correlationTemplate;
