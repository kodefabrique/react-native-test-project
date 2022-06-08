import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IFareItem } from 'types';
import { TemplateSlideTabs } from 'templates';
import { styles, gradients } from './styles';

interface IOwnProps {
  data: IFareItem[];
  renderContent: (
    order: number,
    selectNextTab: (nextSelectedTabOrder: number) => void,
    isWasSelected?: boolean
  ) => JSX.Element;
}

export function UptSlideTabView({ data, renderContent }: IOwnProps) {
  return (
    <ScrollView style={styles.main}>
      <TemplateSlideTabs
        tabsData={data}
        animationOffset={60}
        gapBeetwenTabs={20}
        horizontalGapTabs={20}
        initOrder={0}
        style={{}}
        tabWrapperStyle={{}}
        contentWrapperStyle={{}}
        renderContent={renderContent}
        renderTab={renderTab}
      />

      <View style={styles.gradientWrapperLeft}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={gradients} style={styles.gradient} />
      </View>

      <View style={styles.gradientWrapperRight}>
        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={gradients} style={styles.gradient} />
      </View>
    </ScrollView>
  );
}

function renderTab({ segment }: IFareItem, isActive: boolean) {
  const nameTextStyle = isActive ? styles.nameTextActive : styles.nameTextDisabled;
  const tabStyle = isActive ? styles.tabActive : styles.tabDisabled;

  const departureName = segment.departure.airport.city.name;
  const arrivalName = segment.arrival.airport.city.name;

  return (
    <View style={tabStyle}>
      <Text style={nameTextStyle}>{`${departureName} - ${arrivalName}`}</Text>
    </View>
  );
}
