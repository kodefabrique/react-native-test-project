import React from 'react';
import { View, Text } from 'react-native';
import { UptSlideTab } from '../../UptSlideTab';
import { IFareConditionTabs } from '../../UptTabs';
import { formateTitle } from './utils';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { NAMESPACE, KEYS } from '../translation';

interface IOwnProps {
  item: IFareConditionTabs;
}

export function UptContentView({ item: { itemData } }: IOwnProps) {
  const { t } = useTranslation(NAMESPACE);

  function renderContent(order: number) {
    const { segment, rules } = itemData[order];
    const title = formateTitle(segment);

    return (
      <View style={styles.main}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>

          {rules.map(({ code, fareCode, name, text }) => {
            return (
              <View style={styles.contentText} key={code}>
                <Text style={styles.text}>{name}</Text>

                <Text style={styles.text}>{`${t(KEYS.FARE_CODE)} ${fareCode}`}</Text>

                <Text style={styles.text}>{text}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  return <UptSlideTab data={itemData} renderContent={renderContent} />;
}
