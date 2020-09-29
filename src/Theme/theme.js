import PropTypes from "prop-types";

export const font = `proxima-nova,sans-serif`;

const regular = 500;
const heading = 900;
const bold = "bold";

export const fontWeights = {
  heading,
  regular,
  bold
};

const PRIMARY_LIGHT = "#8F82F4";
const PRIMARY_DARK = "#16233C";

const SECONDARY_LIGHT_ONE = "#9D446E";
const SECONDARY_LIGHT_TWO = "#EE6D8A";
const SECONDARY_LIGHT_THREE = "#DE98AB";

const SECONDARY_DARK_ONE = "#263056";
const SECONDARY_DARK_TWO = "#007CB7";
const SECONDARY_DARK_THREE = "#009FD5";

const GREEN_DARK = "#009499";
const GREEN_MED = "#71D680";
const GREEN_LIGHT = "#b8e9c0";
const BLUE_DARK = "#2D344D";
const BLUE_LIGHT = "#98DDDE";
const ORANGE = "#FEA166";

const WHITE = "#ffffff";
const BLACK = "#000000";
const LIGHT = "#EFEFF4";
const LIGHT_TWO = "#E5E5EA";
const LIGHT_THREE = "#D1D1D6";
const MID = "#CACED8";
const GRAY = "#808597";
const DARK_GRAY = "#63697D";
const DARK = "#263056";
const WARNING = "#F4828C";

const colors = {
  PRIMARY_LIGHT,
  PRIMARY_DARK,
  SECONDARY_LIGHT_ONE,
  SECONDARY_LIGHT_TWO,
  SECONDARY_LIGHT_THREE,
  SECONDARY_DARK_ONE,
  SECONDARY_DARK_TWO,
  SECONDARY_DARK_THREE,
  GREEN_DARK,
  GREEN_MED,
  GREEN_LIGHT,
  BLUE_DARK,
  BLUE_LIGHT,
  ORANGE,
  WHITE,
  BLACK,
  LIGHT,
  LIGHT_TWO,
  LIGHT_THREE,
  MID,
  GRAY,
  DARK_GRAY,
  DARK,
  WARNING
};

export { colors };

export const theme = {
  name: "default",
  font,
  fontWeights,
  colors
};

export const themePropTypes = {
  color: PropTypes.oneOf(Object.keys(colors))
};

export default theme;
