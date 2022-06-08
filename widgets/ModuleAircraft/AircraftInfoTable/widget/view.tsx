import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { Aircraft_AircraftInfo_parameters as AircraftParameters } from '../../../../types/graphql';

interface IOwnProps {
  data: AircraftParameters[];
}

export function AircraftInfoTableView({ data }: IOwnProps) {
  const renderLines = () => {
    return data.map((line, index) => (
      <View key={index} style={styles.lineDiv}>
        <View style={styles.titleDiv}>
          <Text style={styles.titleText}>{line.title}</Text>
        </View>

        <View style={styles.descriptionDiv}>
          <Text style={styles.descriptionText}>{line.value}</Text>
        </View>
      </View>
    ));
  };

  return <View style={styles.div}>{renderLines()}</View>;
}
