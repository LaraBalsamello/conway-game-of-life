import './styles.scss';
import React, { FunctionComponent } from 'react';

const Cell: FunctionComponent<{
  onClickHandler: () => void;
  paintElement: boolean;
}> = ({ onClickHandler, paintElement }) => (
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  <button
    onClick={onClickHandler}
    type="button"
    data-testid="cell"
    className={`round-container ${paintElement && 'paint'}`}
  />
);

export default Cell;
