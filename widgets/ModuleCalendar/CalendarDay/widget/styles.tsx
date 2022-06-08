import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Style } from 'styles';

const { CalendarDay: WidgetStyles } = Style.widgets.ModuleCalendar;

const borderRadius = 20;

const backBase: ViewStyle = {
  position: 'absolute',
  top: 0,
  height: '100%',
  width: '50%',
};

const frontBase: ViewStyle = {
  width: 36,
  height: 36,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
};

const textBase: TextStyle = {
  fontSize: 13,
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
};

export const styles = StyleSheet.create({
  main: {
    ...WidgetStyles.main,
    width: 40,
    height: 36,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backLeftNormal: {
    ...backBase,
    ...WidgetStyles.backLeftNormal,
    left: 0,
  },
  backRightNormal: {
    ...backBase,
    ...WidgetStyles.backRightNormal,
    right: 0,
  },
  backLeftActive: {
    ...backBase,
    ...WidgetStyles.backLeftActive,
    left: 0,
  },
  backRightActive: {
    ...backBase,
    ...WidgetStyles.backRightActive,
    right: 0,
  },
  frontActiveStart: {
    ...frontBase,
    ...WidgetStyles.frontActiveStart,
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
  },
  frontActiveEnd: {
    ...frontBase,
    ...WidgetStyles.frontActiveEnd,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  },
  frontActive: {
    ...frontBase,
    ...WidgetStyles.frontActive,
    borderRadius,
  },
  frontAllow: {
    ...frontBase,
    ...WidgetStyles.frontAllow,
    borderRadius,
  },
  frontNormal: {
    borderRadius,
    ...frontBase,
  },
  textActive: {
    ...textBase,
    ...WidgetStyles.textActive,
  },
  textAllow: {
    ...textBase,
    ...WidgetStyles.textAllow,
  },
  textNormal: {
    ...textBase,
    ...WidgetStyles.textNormal,
  },
  circle: {
    position: 'absolute',
  },
});
