import { Dimensions } from 'react-native';
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;

const HEIGHT_HEADER = 56;
const HEIGHT_TABS = 48;
const HEIGHT_SELECT_MOUNT = 64;
const HEIGHT_FLIGHT_INFO = 58;
const HEIGHT_CONTROLS = 48;
const DEVICE_CONTROLS = 45;

export const HEIGHT_TEXT = 5;

export const HEIGHT_GRAPH =
  WINDOW_HEIGHT -
  HEIGHT_HEADER -
  HEIGHT_TABS -
  HEIGHT_SELECT_MOUNT -
  HEIGHT_FLIGHT_INFO -
  HEIGHT_CONTROLS -
  DEVICE_CONTROLS;

export const DATE_FORMAT = 'YYYY-MM-DD';
