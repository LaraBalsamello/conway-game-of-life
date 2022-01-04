export interface Neighbours {
  topRight: number;
  top: number;
  topLeft: number;
  right: number;
  left: number;
  bottomRight: number;
  bottom: number;
  bottomLeft: number;
}

export interface GetNeighBoursProps {
  currentCel: number;
  celsPerRow: number;
  numberOfRows: number;
  indexInRow: number;
}

export interface Dashboard {
  columns: number;
  rows: number;
}
