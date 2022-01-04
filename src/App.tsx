/* eslint-disable react/jsx-curly-newline */
import React, { FunctionComponent, useEffect, useState } from 'react';
import './App.scss';
import Cel from './components';
import getNeighbours from './core/utils';

const letLive = ({
  aliveNeighbours,
  currentCellAlive,
}: {
  aliveNeighbours: Array<boolean>;
  currentCellAlive: boolean;
}): boolean => {
  if (currentCellAlive) {
    return aliveNeighbours.length >= 2;
  }
  return aliveNeighbours.length === 3;
};

const App: FunctionComponent = () => {
  const dashboard = { columns: 10, rows: 4 };
  const [paintIndexes, setPaintIndexes] = useState<Array<number>>([]);
  const [stop, setStop] = useState<boolean>(true);
  const [generation, setGeneration] = useState<number>(0);

  const runSimulation = () => {
    const modifyIndexes = [...paintIndexes];
    for (let i = 0; i < dashboard.rows; i++) {
      for (let z = 0; z < dashboard.columns; z++) {
        const currentIndex = i + dashboard.columns * z;
        const neighbours = getNeighbours({
          currentCel: currentIndex,
          celsPerRow: dashboard.columns,
          numberOfRows: dashboard.rows,
          indexInRow: i,
        });
        const currentCellAlive = paintIndexes.some(
          (value) => value === currentIndex,
        );
        const aliveNeighbours = paintIndexes.map((x) =>
          neighbours.some((neighbour) => neighbour === x),
        );
        if (letLive({ aliveNeighbours, currentCellAlive })) {
          modifyIndexes.splice(currentIndex, 1);
        } else {
          modifyIndexes.push(currentIndex);
        }
      }
    }
    setTimeout(() => {
      setPaintIndexes(modifyIndexes);
      setGeneration(generation + 1);
    }, 500);
  };

  const stopSimulation = () => {
    setStop(true);
  };

  useEffect(() => {
    if (!stop) {
      runSimulation();
    }
  }, [stop, generation]);

  return (
    <>
      <div className="controllers">
        <button type="button" onClick={() => setStop(false)} disabled={!stop}>
          Start simulation!
        </button>
        <button type="button" onClick={() => stopSimulation()}>
          Stop simulation!
        </button>
        <button
          type="button"
          onClick={() => {
            setGeneration(0);
            setPaintIndexes([]);
            setStop(false);
          }}
          disabled={!stop}
        >
          reset simulation!
        </button>
        <h3>Generation # {generation}</h3>
      </div>
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
    </>
  );
};

export default App;
