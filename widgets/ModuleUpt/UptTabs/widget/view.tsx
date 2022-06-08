import React from 'react';
import { IFareItem } from 'types';
import { TemplateTabs, ITemplateTabsItem } from 'templates';

export type IFareConditionTabs = ITemplateTabsItem<IFareItem[]>;

interface IOwnProps {
  data: IFareConditionTabs[];
  renderContent: (item: IFareConditionTabs, index?: number) => JSX.Element;
}

export function UptTabsView({ data, renderContent }: IOwnProps) {
  // const { t } = useTranslation(NAMESPACE);

  function renderTab() {
    // const tabStyle = isActive ? styles.tabActive : styles.tabNormal;
    // const textStyle = isActive ? styles.textActive : styles.textNormal;
    // const title = index === 0 ? t(KEYS.ORIGINAL) : t(KEYS.TRANSLATE);

    return (
      <></>
      // <View style={[tabStyle, disabled && styles.tabOpacity]}>
      //   <Text style={textStyle}>{title}</Text>
      // </View>
    );
  }
  return (
    <TemplateTabs
      tabsData={data}
      gapWidth={0}
      tabsWrapperStyle={{}}
      renderTab={renderTab}
      renderContent={renderContent}
    />
  );
}
