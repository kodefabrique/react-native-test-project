import { StyleSheet, ViewStyle } from 'react-native';
import { Style } from 'styles';

const { CalendarTabs: WidgetStyles } = Style.widgets.ModuleCalendar;

const headerBase: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: 48,
};

export const styles = StyleSheet.create({
  headerActive: {
    ...headerBase,
    ...WidgetStyles.headerActive,
  },
  headerNormal: {
    ...headerBase,
    ...WidgetStyles.headerNormal,
  },
  headerText: {
    ...WidgetStyles.headerText,
    fontSize: 14,
    lineHeight: 21,
    alignItems: 'center',
  },
});
