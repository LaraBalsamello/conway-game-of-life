import React, { useState } from 'react';

const useDashboardState = () => {
  const [stop, setStop] = useState<boolean>(true);
  const [generation, setGeneration] = useState<number>(0);
};
