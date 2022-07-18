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

/**
 * Function to calculate  cell neighbours. Meaning all cells that "touch" the current cell.
 */
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

/**
 * Function to process each cell state.
 * We first pick up the currently living cells in the modifyIndexes var.
 * Later we proceed on iterating each row, and inside each row we iterate this column.
 * This could be different but to avoid a code refactor that would take too long it was decided
 * to make it like this to recycle logic in getNeighbours().
 * After that for each iteration we calculate currentIndex the same way we do in handleClick()
 * then we check if current cell is living by checking if it exists in the param livingCells.
 * after that we get all cell neighbours and check the same
 * way we did with the current cell if they are alive or not.
 * After all this we decide if cell has to leave or not and we push it to the modify indexes
 * that the function will return and would be saved in the hook that controls the board state.
 */
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
        modifyIndexes.splice(modifyIndexes.indexOf(currentIndex), 1);
      }
    }
  }
  return modifyIndexes;
};
