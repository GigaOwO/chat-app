export interface DefaultSize {
  S: string;
  M: string;
  L: string;
  XL: string;
}

export interface InputSize extends DefaultSize {
  full: string;
}

export interface Opacity {
  focus: string;
  hover: string;
}

export interface Flex {
  row: string;
  col: string;
  rowReverse: string;
  colReverse: string;
}