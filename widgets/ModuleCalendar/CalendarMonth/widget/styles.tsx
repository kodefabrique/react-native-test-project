import { StyleSheet } from 'react-native';
import { Style } from 'styles';

const { CalendarMonth: WidgetStyles } = Style.widgets.ModuleCalendar;

export const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 280,
  },
  monthText: {
    ...WidgetStyles.monthText,
    fontSize: 16,
    letterSpacing: 0,
    textTransform: 'capitalize',
  },
  yearText: {
    ...WidgetStyles.yearText,
    fontSize: 16,
    letterSpacing: 0,
  },
  days: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  emptyDay: {
    ...WidgetStyles.emptyDay,
    height: 36,
    width: 40,
  },
  daysLine: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 36,
    marginTop: 4,
  },
  week: {
    height: 36,
    minWidth: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekText: {
    ...WidgetStyles.weekText,
    fontSize: 12,
    letterSpacing: 0,
  },
  weekWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  day: {
    marginBottom: 2,
  },
});
