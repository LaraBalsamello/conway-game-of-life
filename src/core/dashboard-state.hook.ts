import { useEffect, useState } from 'react';
import { Dashboard } from '../types';
import { processCellStates } from './utils';

export const useDashboardState = () => {
  /**
   *
   * Control the dashboard size. (in columns and rows)
   */
  const [dashboard, setDashboard] = useState<Dashboard>({
    columns: 50,
    rows: 30,
  });
  /**
   * Control the time it takes to execute the simulation.
   */
  const [executionDelay, setExecutionDelay] = useState<number>(300);
  /**
   * Set Amount of living cells.
   */
  const [livingCells, setLivingCells] = useState<Array<number>>([]);
  /**
   * Run or stop simulation.
   */
  const [stop, setStop] = useState<boolean>(true);
  /**
   * Number of generation we are in.
   */
  const [generation, setGeneration] = useState<number>(0);

  /**
   * In dashState we retrieve the item which holds the board if we saved it in past state.
   */
  useEffect(() => {
    const dashState = localStorage.getItem('board');
    if (dashState) {
      const parsedDashState = JSON.parse(dashState);
      setDashboard({ ...parsedDashState.dashboard });
      setExecutionDelay(parsedDashState.executionDelay);
      setGeneration(parsedDashState.generation);
      setLivingCells(parsedDashState.livingCells);
    }
  }, []);

  /**
   * Run simulation. We first process cell states and afterwards we set Living cells for next gen.
   */
  const runSimulation = () => {
    const newLivingCells = processCellStates({ livingCells, dashboard });
    setTimeout(() => {
      setLivingCells(newLivingCells);
      setGeneration(generation + 1);
    }, executionDelay);
  };

  /**
   * Next use effect controls the simulation runtime.
   * It takes to dependencies to do so because if we only took
   * stop as a dependency as it might not change the simulation will only run once.
   */
  useEffect(() => {
    if (!stop) {
      runSimulation();
    }
  }, [stop, generation]);

  return {
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
  };
};
