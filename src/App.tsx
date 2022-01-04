/* eslint-disable react/jsx-curly-newline */
import React, { FunctionComponent, useEffect, useState } from 'react';
import './App.scss';
import Button from './components/button/button';
import Cell from './components/cell/cell';
import Input from './components/input/input';
import { getNeighbours, letLive } from './core/utils';
import { Dashboard } from './types';

const App: FunctionComponent = () => {
  const [dashboard, setDashboard] = useState<Dashboard>({
    columns: 50,
    rows: 30,
  });
  const [executionDelay, setExecutionDelay] = useState<number>(300);
  const [livingCells, setLivingCells] = useState<Array<number>>([]);
  const [stop, setStop] = useState<boolean>(true);
  const [generation, setGeneration] = useState<number>(0);

  const runSimulation = () => {
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

        if (
          letLive({ aliveNeighbours, currentCellAlive }) &&
          !currentCellAlive
        ) {
          modifyIndexes.push(currentIndex);
        } else if (
          !letLive({ aliveNeighbours, currentCellAlive }) &&
          currentCellAlive
        ) {
          modifyIndexes.splice(livingCells.indexOf(currentIndex), 1);
        }
      }
    }
    setTimeout(() => {
      setLivingCells(modifyIndexes);
      setGeneration(generation + 1);
    }, executionDelay);
  };

  const stopSimulation = () => {
    setStop(true);
  };

  const reset = (): void => {
    setGeneration(0);
    setLivingCells([]);
    setStop(true);
  };

  const handleClick = ({ i, z }: { i: number; z: number }) => {
    const newLivingCells = [...livingCells];
    const currentIndex = i + dashboard.columns * z;
    const currentlyAliveCell = livingCells.indexOf(currentIndex);
    if (currentlyAliveCell === -1) {
      newLivingCells.push(currentIndex);
    } else {
      newLivingCells.splice(currentlyAliveCell, 1);
    }
    setLivingCells(newLivingCells);
  };

  useEffect(() => {
    if (!stop) {
      runSimulation();
    }
  }, [stop, generation]);

  return (
    <div className="full-screen-container">
      <div className="dashboard">
        <div className="controllers">
          <Input
            text=" Cantidad de columnas en el tablero:"
            value={dashboard.columns}
            onChange={({ target: { value } }) =>
              setDashboard({ ...dashboard, columns: Number(value) })
            }
          />
          <Input
            text=" Cantidad de filas en el tablero:"
            value={dashboard.rows}
            onChange={({ target: { value } }) =>
              setDashboard({ ...dashboard, rows: Number(value) })
            }
          />
          <Input
            text="Tiempo de ejecucíon de la simulación:"
            value={executionDelay}
            onChange={({ target: { value } }) =>
              setExecutionDelay(Number(value))
            }
          />
        </div>
        <div className="controllers-container">
          <div className="buttons">
            <Button
              onClick={() => setStop(false)}
              disabled={!stop}
              text="Start"
            />
            <Button onClick={stopSimulation} text="Stop" />
            <Button onClick={reset} disabled={!stop} text="Reset" />
          </div>

          <h3>Generation # {generation}</h3>
        </div>
        {[...Array(dashboard.rows)].map((x, z) => (
          <div className="dashboard-row" key={z}>
            {[...Array(dashboard.columns)].map((v, i) => (
              <Cell
                onClickHandler={() => handleClick({ i, z })}
                paintElement={livingCells?.some(
                  (value) => value === i + dashboard.columns * z,
                )}
                key={`cell${i + z}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
