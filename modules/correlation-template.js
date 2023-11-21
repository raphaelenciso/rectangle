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
    "HDK\n" +
    "------------------------\n" +
    rectangle.rhdkRes +
    "LDK\n" +
    "------------------------\n" +
    rectangle.rldkRes +
    "RK\n" +
    "------------------------\n" +
    rectangle.rrkRes +
    "========================================\n" +
    "3D EXTENDED RECTANGLE\n" +
    "========================================\n" +
    "HDK\n" +
    "------------------------\n" +
    threeDimensional.tdHdkRes +
    "LDK\n" +
    "------------------------\n" +
    threeDimensional.tdLdkRes +
    "RK\n" +
    "------------------------\n" +
    threeDimensional.tdRkRes +
    "========================================\n" +
    "MODIFIED KSA RECTANGLE\n" +
    "========================================\n" +
    "HDK\n" +
    "------------------------\n" +
    modifiedKsa.mkHdkRes +
    "LDK\n" +
    "------------------------\n" +
    modifiedKsa.mkLdkRes +
    "RK\n" +
    "------------------------\n" +
    modifiedKsa.mkRkRes +
    "========================================\n" +
    "MODIFIED RECTANGLE\n" +
    "========================================\n" +
    "HDK\n" +
    "------------------------\n" +
    modified.mHdkRes +
    "LDK\n" +
    "------------------------\n" +
    modified.mLdkRes +
    "RK\n" +
    "------------------------\n" +
    modified.mRkRes
  );
}

module.exports = correlationTemplate;
