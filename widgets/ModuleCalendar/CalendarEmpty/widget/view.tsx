import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { NAMESPACE, KEYS } from '../translation';
import { useTranslation } from 'react-i18next';

export function CalendarEmptyView() {
  const { t } = useTranslation(NAMESPACE);
  return (
    <View style={styles.main}>
      <View style={styles.topDiv}>
        <Text style={styles.topText}>{t(KEYS.NOT_AVAILABLE)}</Text>
      </View>

      <View style={styles.botDiv}>
        <Text style={styles.botText}>{t(KEYS.SELECT_ANOTHER_ROUTE)}</Text>
      </View>
    </View>
  );
}
