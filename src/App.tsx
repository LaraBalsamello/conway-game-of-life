/* eslint-disable react/jsx-curly-newline */
import React, { FunctionComponent, useState } from 'react';
import './App.scss';
import Cel from './components';
import {
  getBottomNeighbour,
  getLeftNeighbour,
  getLeftSubNeighbour,
  getRightNeighbour,
  getTopNeighbour,
  getRightSubNeighbour,
} from './core/utils';
import { GetNeighBoursProps, Neighbours } from './types';

const App: FunctionComponent = () => {
  const dashboard = { columns: 50, rows: 30 };
  const [paintIndexes, setPaintIndexes] = useState<Array<number>>([]);

  const getNeighbours = ({
    currentCel,
    celsPerRow,
    numberOfRows,
    indexInRow,
  }: GetNeighBoursProps): void => {
    const cellNeighbours: Neighbours = {
      bottom: getBottomNeighbour(
        currentCel,
        celsPerRow,
        numberOfRows,
        indexInRow,
      ),
      top: getTopNeighbour(currentCel, celsPerRow, numberOfRows, indexInRow),
      left: getLeftNeighbour(currentCel, celsPerRow, indexInRow),
      right: getRightNeighbour(currentCel, celsPerRow, indexInRow),
      bottomLeft: getLeftSubNeighbour(
        getBottomNeighbour(currentCel, celsPerRow, numberOfRows, indexInRow),
        indexInRow,
        celsPerRow,
      ),
      bottomRight: getRightSubNeighbour(
        getBottomNeighbour(currentCel, celsPerRow, numberOfRows, indexInRow),
        indexInRow,
        celsPerRow,
      ),
      topLeft: getLeftSubNeighbour(
        getTopNeighbour(currentCel, celsPerRow, numberOfRows, indexInRow),
        indexInRow,
        celsPerRow,
      ),
      topRight: getRightSubNeighbour(
        getTopNeighbour(currentCel, celsPerRow, numberOfRows, indexInRow),
        indexInRow,
        celsPerRow,
      ),
    };

    setPaintIndexes([
      cellNeighbours.top,
      cellNeighbours.bottom,
      cellNeighbours.left,
      cellNeighbours.right,
      cellNeighbours.bottomLeft,
      cellNeighbours.bottomRight,
      cellNeighbours.topLeft,
      cellNeighbours.topRight,
    ]);
  };

  return (
    <div className="dashboard">
      {[...Array(dashboard.rows)].map((x, z) => (
        <div className="dashboard-row">
          {[...Array(dashboard.columns)].map((v, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Cel
              onClickHandler={() => {
                const indexesToPaint = [...paintIndexes];
                const currentIndex = i + dashboard.columns * z;
                if (indexesToPaint.indexOf(currentIndex)) {
                  indexesToPaint.push(currentIndex);
                  setPaintIndexes(indexesToPaint);
                }
              }}
              paintElement={
                paintIndexes?.some(
                  (value) => value === i + dashboard.columns * z,
                ) ?? false
              }
              key={`cel${i + z}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
