import './styles.scss';
import React, { FunctionComponent } from 'react';

const Cel: FunctionComponent<{
  onClickHandler: () => void;
  paintElement: boolean;
}> = ({ onClickHandler, paintElement }) => (
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  <button
    onClick={onClickHandler}
    type="button"
    className={`round-container ${paintElement && 'paint'}`}
  />
);

export default Cel;
