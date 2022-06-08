import { Dimensions, StyleSheet } from 'react-native';
import { Palette } from 'styles';

const { width, height } = Dimensions.get('screen');

const SCALE = 240 / 414;

export const styles = StyleSheet.create({
  mainSlider: {},
  pointsDiv: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 6,
  },
  activePointDiv: {
    width: 6,
    height: 6,
    backgroundColor: Palette.white,
    margin: 3,
    borderRadius: 6,
  },
  disablePointDiv: {
    width: 6,
    height: 6,
    borderRadius: 6,
    margin: 3,
    borderWidth: 1,
    borderColor: Palette.white,
  },
  sliderFullScreen: {
    flex: 1,
    backgroundColor: Palette.white,
  },
  mainSliderDiv: {
    width,
  },
  image: {
    height: width * SCALE,
    width,
  },
  imageFull: {
    height: width,
    width: height,
  },
});
