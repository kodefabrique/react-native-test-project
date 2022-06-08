import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Style } from 'styles';

const { UptTabs: WidgetStyles } = Style.widgets.ModuleUpt;

const tabBase: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: 44,
};

const textBase: TextStyle = {
  ...WidgetStyles.textBase,
  fontSize: 14,
  lineHeight: 21,
};

export const styles = StyleSheet.create({
  tabActive: {
    ...tabBase,
    ...WidgetStyles.tabActive,
  },
  tabNormal: {
    ...tabBase,
    ...WidgetStyles.tabNormal,
  },
  textActive: {
    ...textBase,
    ...WidgetStyles.textActive,
  },
  textNormal: {
    ...textBase,
    ...WidgetStyles.textNormal,
  },
  tabOpacity: {
    opacity: 0.5,
  },
});
