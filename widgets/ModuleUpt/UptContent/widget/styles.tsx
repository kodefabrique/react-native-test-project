import { StyleSheet, Dimensions } from 'react-native';
import { Style } from 'styles';

const { width } = Dimensions.get('window');

const { UptContent: WidgetStyles } = Style.widgets.ModuleUpt;

export const styles = StyleSheet.create({
  main: {
    marginBottom: 20,
    width,
  },
  line: {
    borderBottomWidth: 1,
    ...WidgetStyles.line,
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  contentText: {
    marginTop: 19,
  },
  title: {
    ...WidgetStyles.title,
    fontSize: 28,
    lineHeight: 47,
  },
  text: {
    ...WidgetStyles.text,
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
  },
});
