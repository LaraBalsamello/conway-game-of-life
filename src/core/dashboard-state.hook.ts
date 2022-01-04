import { useEffect, useState } from 'react';
import { Dashboard } from '../types';
import { processCellStates } from './utils';

const useDashboardState = () => {
  const [dashboard, setDashboard] = useState<Dashboard>({
    columns: 50,
    rows: 30,
  });
  const [executionDelay, setExecutionDelay] = useState<number>(300);
  const [livingCells, setLivingCells] = useState<Array<number>>([]);
  const [stop, setStop] = useState<boolean>(true);
  const [generation, setGeneration] = useState<number>(0);

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

  const runSimulation = () => {
    const newLivingCells = processCellStates({ livingCells, dashboard });
    setTimeout(() => {
      setLivingCells(newLivingCells);
      setGeneration(generation + 1);
    }, executionDelay);
  };

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

export default useDashboardState;
