import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useDashboardState } from './dashboard-state.hook';

describe('useDashboardState hook should', () => {
  beforeEach(() => jest.clearAllMocks());
  it('run simulation and change generation number', async () => {
    const { result, waitForValueToChange } = renderHook(() =>
      useDashboardState(),
    );
    await waitFor(() => result.current.setExecutionDelay(200));
    await waitFor(() => result.current.setStop(false));
    await waitForValueToChange(() => result.current.generation);
    await waitFor(() => result.current.setStop(true));
    expect(result.current.generation).toStrictEqual(1);
  });
});
