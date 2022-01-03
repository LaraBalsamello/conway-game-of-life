export const getTopNeighbour = (
  currentCel: number,
  celsPerRow: number,
  numberOfRows: number,
  indexInRow: number,
): number => {
  const cel = currentCel - celsPerRow;
  if (cel > 0 && cel < numberOfRows * celsPerRow) {
    return cel;
  }
  return numberOfRows * celsPerRow - (celsPerRow - indexInRow);
};

export const getBottomNeighbour = (
  currentCel: number,
  celsPerRow: number,
  numberOfRows: number,
  indexInRow: number,
): number => {
  const cel = currentCel + celsPerRow;
  if (cel > 0 && cel < numberOfRows * celsPerRow) {
    return cel;
  }
  return indexInRow;
};

export const getLeftNeighbour = (
  currentCel: number,
  celsPerRow: number,
  indexInRow: number,
): number => {
  const cel = currentCel - 1;
  if (indexInRow !== 0) {
    return cel;
  }
  return currentCel + celsPerRow - 1;
};

export const getRightNeighbour = (
  currentCel: number,
  celsPerRow: number,
  indexInRow: number,
): number => {
  const cel = currentCel + 1;
  if (indexInRow !== celsPerRow - 1) {
    return cel;
  }
  return currentCel - celsPerRow + 1;
};

export const getLeftSubNeighbour = (
  currentCell: number,
  indexInRow: number,
  celsPerRow: number,
) => {
  if (indexInRow !== 0) {
    return currentCell - 1;
  }
  return currentCell + celsPerRow - 1;
};

export const getRightSubNeighbour = (
  currentCell: number,
  indexInRow: number,
  celsPerRow: number,
) => {
  if (indexInRow !== celsPerRow - 1) {
    return currentCell + 1;
  }
  return currentCell - celsPerRow + 1;
};
