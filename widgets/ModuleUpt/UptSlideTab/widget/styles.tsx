import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Style } from 'styles';

const { UptSlideTab: WidgetStyles } = Style.widgets.ModuleUpt;

const nameTextBase: TextStyle = {
  ...WidgetStyles.nameTextBase,
  fontSize: 15,
  lineHeight: 22,
  alignItems: 'center',
  textAlign: 'center',
};

const tabBase: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 51,
  paddingTop: 8,
  paddingBottom: 12,
};

const gradientWrapperBase: ViewStyle = {
  height: 51,
  width: 20,
  position: 'absolute',
};

export const styles = StyleSheet.create({
  main: {},
  nameTextActive: {
    ...nameTextBase,
    ...WidgetStyles.nameTextActive,
  },
  nameTextDisabled: {
    ...nameTextBase,
    ...WidgetStyles.nameTextDisabled,
  },
  tabActive: {
    ...tabBase,
    paddingBottom: 9,
    borderBottomWidth: 3,
    ...WidgetStyles.tabActive,
  },
  tabDisabled: {
    ...tabBase,
  },
  gradientWrapperLeft: {
    ...gradientWrapperBase,
    left: 0,
  },
  gradientWrapperRight: {
    ...gradientWrapperBase,
    right: 0,
  },
  gradient: {
    flex: 1,
  },
});

export const gradients = WidgetStyles.gradients;
