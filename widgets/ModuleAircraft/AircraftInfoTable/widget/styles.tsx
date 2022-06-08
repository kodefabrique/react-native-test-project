import { StyleSheet } from 'react-native';
import { Style } from 'styles';

const { AircraftInfoTable: WidgetStyles } = Style.widgets.ModuleAircraft;

export const styles = StyleSheet.create({
  div: {
    padding: 20,
  },
  lineDiv: {
    flexDirection: 'row',
  },
  titleDiv: {
    flex: 1,
  },
  descriptionDiv: {
    flex: 2,
  },
  titleText: {
    ...WidgetStyles.titleText,
    fontSize: 13,
    lineHeight: 24,
  },
  descriptionText: {
    ...WidgetStyles.descriptionText,
    fontSize: 13,
    lineHeight: 24,
  },
});
