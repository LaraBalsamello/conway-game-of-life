/* eslint-disable react/jsx-curly-newline */
import React, { FunctionComponent } from 'react';
import './App.scss';
import Button from './components/button/button';
import Cell from './components/cell/cell';
import Input from './components/input/input';
import useDashboardState from './core/dashboard-state.hook';

const App: FunctionComponent = () => {
  const {
    dashboard,
    setDashboard,
    executionDelay,
    setExecutionDelay,
    livingCells,
    setLivingCells,
    stop,
    setStop,
    generation,
    setGeneration,
  } = useDashboardState();

  const stopSimulation = () => {
    setStop(true);
  };

  const reset = (): void => {
    setGeneration(0);
    setLivingCells([]);
    setStop(true);
  };

  const saveBoard = () => {
    localStorage.setItem(
      'board',
      JSON.stringify({
        livingCells,
        dashboard,
        executionDelay,
        generation,
      }),
    );
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
            <Button onClick={saveBoard} disabled={!stop} text="Save" />
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
