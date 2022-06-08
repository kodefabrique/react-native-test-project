import React from 'react';
import { Animated, Text, View } from 'react-native';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { KEYS, NAMESPACE } from '../translation';

interface IOwnProps {
  welcomeVisible: boolean;
  animationTranslateY: Animated.Value;
  userName: string;
}

export function WelcomeContentView({ welcomeVisible, userName, animationTranslateY }: IOwnProps) {
  const { t } = useTranslation(NAMESPACE);

  function renderContent() {
    return (
      <View style={styles.content}>
        <Text style={styles.welcomeTitle}>{t(KEYS.TITLE_MODAL)}</Text>

        <Text style={styles.welcomeUserName}>{userName}</Text>
        <Text style={styles.loggedInText}>{t(KEYS.CONTENT_MODAL)}</Text>
      </View>
    );
  }

  return (
    welcomeVisible && (
      <View style={styles.welcomeBackdrope}>
        <Animated.View style={[styles.welcomeContentBox, { height: animationTranslateY }]}>
          {renderContent()}
        </Animated.View>
      </View>
    )
  );
}
