import { GetNeighBoursProps } from '../types';

const getTopNeighbour = (
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

const getBottomNeighbour = (
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

const getLeftNeighbour = (
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

const getRightNeighbour = (
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

const getLeftSubNeighbour = (
  currentCell: number,
  indexInRow: number,
  celsPerRow: number,
) => {
  if (indexInRow !== 0) {
    return currentCell - 1;
  }
  return currentCell + celsPerRow - 1;
};

const getRightSubNeighbour = (
  currentCell: number,
  indexInRow: number,
  celsPerRow: number,
) => {
  if (indexInRow !== celsPerRow - 1) {
    return currentCell + 1;
  }
  return currentCell - celsPerRow + 1;
};

export const getNeighbours = ({
  currentCel,
  celsPerRow,
  numberOfRows,
  indexInRow,
}: GetNeighBoursProps): Array<number> => [
  getBottomNeighbour(currentCel, celsPerRow, numberOfRows, indexInRow),
  getTopNeighbour(currentCel, celsPerRow, numberOfRows, indexInRow),
  getLeftNeighbour(currentCel, celsPerRow, indexInRow),
  getRightNeighbour(currentCel, celsPerRow, indexInRow),
  getLeftSubNeighbour(
    getBottomNeighbour(currentCel, celsPerRow, numberOfRows, indexInRow),
    indexInRow,
    celsPerRow,
  ),
  getRightSubNeighbour(
    getBottomNeighbour(currentCel, celsPerRow, numberOfRows, indexInRow),
    indexInRow,
    celsPerRow,
  ),
  getLeftSubNeighbour(
    getTopNeighbour(currentCel, celsPerRow, numberOfRows, indexInRow),
    indexInRow,
    celsPerRow,
  ),
  getRightSubNeighbour(
    getTopNeighbour(currentCel, celsPerRow, numberOfRows, indexInRow),
    indexInRow,
    celsPerRow,
  ),
];

export const letLive = ({
  aliveNeighbours,
  currentCellAlive,
}: {
  aliveNeighbours: Array<number>;
  currentCellAlive: boolean;
}): boolean => {
  if (currentCellAlive) {
    return aliveNeighbours.length === 2 || aliveNeighbours.length === 3;
  }
  return aliveNeighbours.length === 3;
};
