import { Dashboard, GetNeighBoursProps } from '../types';

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

const letLive = ({
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

export const processCellStates = ({
  livingCells,
  dashboard,
}: {
  livingCells: Array<number>;
  dashboard: Dashboard;
}): Array<number> => {
  const modifyIndexes = [...livingCells];
  for (let i = 0; i < dashboard.rows; i++) {
    for (let z = 0; z < dashboard.columns; z++) {
      const currentIndex = z + dashboard.columns * i;
      const currentCellAlive = livingCells.indexOf(currentIndex) !== -1;
      const aliveNeighbours = getNeighbours({
        currentCel: currentIndex,
        celsPerRow: dashboard.columns,
        numberOfRows: dashboard.rows,
        indexInRow: z,
      }).filter((neighbour) =>
        livingCells.some((index) => neighbour === index),
      );

      if (letLive({ aliveNeighbours, currentCellAlive }) && !currentCellAlive) {
        modifyIndexes.push(currentIndex);
      } else if (
        !letLive({ aliveNeighbours, currentCellAlive }) &&
        currentCellAlive
      ) {
        modifyIndexes.splice(livingCells.indexOf(currentIndex), 1);
      }
    }
  }
  return modifyIndexes;
};
