import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { TemplateTabs, ITemplateTabsItem } from 'templates';
import { Calendar, Graph } from '../assets';
import { SharedSpacer } from '../../../ModuleShared';
import { NAMESPACE, KEYS } from '../translation';
import { useTranslation } from 'react-i18next';

type DataType = ITemplateTabsItem<void>;

const data: DataType[] = [
  {
    itemData: null,
    key: 'first',
  },
  {
    itemData: null,
    key: 'second',
  },
];

interface IOwnProps {
  renderContent: (item: DataType, index: number) => JSX.Element;
}

function Widget({ renderContent }: IOwnProps) {
  const { t } = useTranslation(NAMESPACE);

  return (
    <TemplateTabs
      tabsData={data}
      gapWidth={0}
      tabsWrapperStyle={{}}
      renderTab={renderTab(t)}
      renderContent={renderContent}
    />
  );
}

function renderTab(t: (string: string) => string) {
  return function (item: DataType, isActive: boolean, index: number) {
    const mainStyle = isActive ? styles.headerActive : styles.headerNormal;

    return index === 0 ? (
      <View style={mainStyle}>
        <Calendar />

        <SharedSpacer height={0} width={8} />

        <Text style={styles.headerText}>{t(KEYS.CALENDAR)}</Text>
      </View>
    ) : (
      <View style={mainStyle}>
        <Graph />

        <SharedSpacer height={0} width={8} />

        <Text style={styles.headerText}>{t(KEYS.PRICE_GRAPH)}</Text>
      </View>
    );
  };
}

export const CalendarTabsView = memo(Widget);
