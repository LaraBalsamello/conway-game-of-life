/* eslint-disable react/jsx-curly-newline */
import React, { FunctionComponent, useEffect, useState } from 'react';
import './styles.scss';
import Button from './components/button/button';
import Cell from './components/cell/cell';
import Input from './components/input/input';
import { useDashboardState } from './core/dashboard-state.hook';

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
  const [saved, setSaveBoard] = useState(false);

  const stopSimulation = () => {
    setStop(true);
  };

  /**
   * Function to reset de dashboard to its initial state.
   */
  const reset = (): void => {
    setGeneration(0);
    setLivingCells([]);
    setStop(true);
  };

  /**
   * Function to save board in localStorage to then resume from a certain point.
   * Saving is not automatic, board must be save clicking the save button.
   */
  const saveBoard = () => {
    setSaveBoard(true);
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

  /**
   * Function to handle click in cell.
   * We first pick up the currently living cells in the newLivingCells var.
   * Later we proceed with getting currentIndex of the cell we've clicked,
   * we need to first multiply the amount of columns with z
   * (that is the amound of rows) and the we sum that with i
   * that is the index corresponding to the single row the cell is in.
   * After we proceed with adding the cell
   * if it is not currently alive or subtracting the cell on the oposite case.
   */
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
    if (saved) {
      setTimeout(() => {
        setSaveBoard(false);
      }, 1000);
    }
  }, [saveBoard]);

  return (
    <div className="full-screen-container">
      <h1>Conway&apos;s game of life</h1>
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
              testId="start"
              onClick={() => setStop(false)}
              disabled={!stop}
              text="Comenzar"
            />
            <Button onClick={stopSimulation} text="Parar" testId="stop" />
            <Button
              onClick={reset}
              disabled={!stop}
              text="Reiniciar"
              testId="reset"
            />
            <Button
              onClick={saveBoard}
              disabled={!stop}
              text="Guardar"
              testId="save"
            />
          </div>

          <h4>Generación #{generation}</h4>
        </div>
        <div className="float-relative">
          {saved && <h4 className="float">Tablero guardado!</h4>}
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
    </div>
  );
};

export default App;
