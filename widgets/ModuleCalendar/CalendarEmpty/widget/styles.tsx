import { StyleSheet } from 'react-native';
import { Style } from 'styles';

const { CalendarEmpty: WidgetStyles } = Style.widgets.ModuleCalendar;

export const styles = StyleSheet.create({
  main: {
    borderRadius: 4,
  },
  topDiv: {
    ...WidgetStyles.topDiv,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  botDiv: {
    ...WidgetStyles.botDiv,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  topText: {
    ...WidgetStyles.topText,
    fontSize: 18,
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 27,
  },
  botText: {
    ...WidgetStyles.botText,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22.5,
  },
});
