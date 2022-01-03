import React from 'react';
import './App.scss';
import Cel from './components';

const App = () => {
  const dashboard = { columns: 10, rows: 10 };
  return (
    <div className="dashboard">
      {[...Array(dashboard.rows)].map(() => (
        <div className="dashboard-row">
          {[...Array(dashboard.columns)].map((v, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Cel key={`cel${i}`} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
