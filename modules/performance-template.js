function performanceTemplate(
  rectangle,
  threeDimensional,
  modifiedKsa,
  modified
) {
  return (
    "Performance \n\n" +
    "========================================\n" +
    "RECTANGLE  \n" +
    "========================================\n" +
    "Speed: " +
    rectangle.speed +
    " ms" +
    "\n" +
    "Throughput: " +
    rectangle.throughput +
    " bit/ms" +
    "\n\n" +
    "========================================\n" +
    "3D EXTENDED RECTANGLE\n" +
    "========================================\n" +
    "Speed: " +
    threeDimensional.speed +
    " ms" +
    "\n" +
    "Throughput: " +
    threeDimensional.throughput +
    " bit/ms" +
    "\n\n" +
    "========================================\n" +
    "MODIFIED KSA RECTANGLE\n" +
    "========================================\n" +
    "Speed: " +
    modifiedKsa.speed +
    " ms" +
    "\n" +
    "Throughput: " +
    modifiedKsa.throughput +
    " bit/ms" +
    "\n\n" +
    "========================================\n" +
    "MODIFIED RECTANGLE\n" +
    "========================================\n" +
    "Speed: " +
    modified.speed +
    " ms" +
    "\n" +
    "Throughput: " +
    modified.throughput +
    " bit/ms" +
    "\n"
  );
}

module.exports = performanceTemplate;
