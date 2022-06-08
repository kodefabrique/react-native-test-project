import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SharedDashedLine } from '../../../ModuleShared';
import { gradient, styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {
  Aircraft_AircraftInfo_cabins as AircraftCabins,
  Aircraft_AircraftInfo_cabins_parameters as AircraftCabinsParams,
} from '../../../../types/graphql';
import { useTranslation } from 'react-i18next';
import { FARES_LIST, NAMESPACE } from '../translation';

interface IOwnProps {
  data: AircraftCabins[];
  checkFirst: (value: number) => boolean;
  checkFirstItem: (value: number) => {};
}

export function AircraftFaresView({ data, checkFirst, checkFirstItem }: IOwnProps) {
  const { t } = useTranslation(NAMESPACE);

  const renderParameters = (parameters: AircraftCabinsParams[]) => {
    return parameters.map((item, index) => (
      <Text key={index} style={styles.itemText}>
        {item.title}: {item.value}
      </Text>
    ));
  };

  const renderItem = () => {
    return data.map((item, index) => {
      const itemTitle = FARES_LIST[item.title] ? t(FARES_LIST[item.title]) : item.title;

      return (
        <View key={index} style={[styles.itemDiv, checkFirstItem(index)]}>
          <View style={styles.imageDiv}>
            <Image resizeMode="cover" source={{ uri: item.image }} style={styles.itemImage} />

            <LinearGradient colors={gradient} style={styles.imageTextDiv}>
              <Text style={styles.imageText}>{itemTitle}</Text>
            </LinearGradient>
          </View>

          <View style={styles.descrDiv}>
            {!checkFirst(index) && <SharedDashedLine style={styles.dashLineDiv} />}

            <View style={styles.textDiv}>{renderParameters(item.parameters)}</View>
          </View>
        </View>
      );
    });
  };

  return (
    <ScrollView style={styles.div} horizontal={true} showsHorizontalScrollIndicator={false}>
      {renderItem()}
    </ScrollView>
  );
}
