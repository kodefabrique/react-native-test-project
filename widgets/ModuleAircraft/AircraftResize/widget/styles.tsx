import { Dimensions, StyleSheet } from 'react-native';
import { Style } from 'styles/themes';

const { AircraftResize: WidgetStyles } = Style.widgets.ModuleAircraft;

const { width, height } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  div: {},
  imageDiv: {
    ...WidgetStyles.imageDiv,
    flex: 1,
  },
  aircraftFullScreen: {
    height: width,
    width: height,
    resizeMode: 'contain',
  },
});

export function calcImageStyle(scale: number) {
  return {
    height: width * scale,
    width,
  };
}
