import { StyleSheet } from 'react-native';
import { Style } from 'styles';

export const { WelcomeContent: WelcomeContentStyles } = Style.widgets.ModuleWelcome;

export const styles = StyleSheet.create({
  welcomeBackdrope: {
    ...WelcomeContentStyles.welcomeBackdrope,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'flex-end',
  },
  welcomeContentBox: {
    ...WelcomeContentStyles.welcomeContentBox,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  content: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    flex: 1,
  },
  welcomeTitle: {
    ...WelcomeContentStyles.welcomeTitle,
    fontSize: 28,
  },
  welcomeUserName: {
    ...WelcomeContentStyles.loggedInText,
    fontSize: 18,
    marginTop: 86,
  },
  loggedInText: {
    ...WelcomeContentStyles.loggedInText,
    fontSize: 18,
  },
});
