import { Dimensions, StyleSheet } from 'react-native';
import { Palette } from 'styles';
import { Style } from 'styles';

const { AircraftFares: WidgetStyles } = Style.widgets.ModuleAircraft;

const { width } = Dimensions.get('screen');

export const gradient = WidgetStyles.gradient;

export const styles = StyleSheet.create({
  div: {
    marginTop: 1,
  },
  itemDiv: {},
  notFirstItemDiv: {
    marginLeft: 1,
  },
  itemImage: {
    width: width,
    height: 264,
  },
  imageDiv: {},
  textDiv: {
    // height: 100,
    width: width,
    paddingTop: 20,
    paddingLeft: 40,
  },
  descrDiv: {
    flexDirection: 'row',
  },
  dashLineDiv: {
    width: 1,
    flexDirection: 'column',
  },
  notFirstTextDiv: {
    borderLeftWidth: 1,
    borderLeftColor: Palette.greyBackgroundLight,
    borderStyle: 'dashed',
    borderRadius: 5,
  },
  imageTextDiv: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 12,
    paddingTop: 5,
    paddingBottom: 6,
    paddingRight: 81,
    position: 'absolute',
    bottom: 0,
    left: 40,
  },
  itemText: {
    ...WidgetStyles.itemText,
    fontSize: 14,
    lineHeight: 26,
  },
  imageText: {
    ...WidgetStyles.imageText,
    fontSize: 16,
    lineHeight: 22,
    alignItems: 'center',
    color: Palette.white,
  },
});
