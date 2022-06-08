import React, { memo, useMemo, useCallback } from 'react';
import { TouchableOpacity, View, Text, ViewStyle } from 'react-native';
import { DAY_TYPE } from 'types';
import { Circle } from '../assets';
import { styles } from './styles';

const SWITCH_STYLE = {
  [DAY_TYPE.ACTIVE_START]: {
    text: styles.textActive,
    front: styles.frontActiveStart,
    backLeft: styles.backLeftNormal,
    backRight: styles.backRightActive,
  },
  [DAY_TYPE.ACTIVE_END]: {
    text: styles.textActive,
    front: styles.frontActiveEnd,
    backLeft: styles.backLeftActive,
    backRight: styles.backRightNormal,
  },
  [DAY_TYPE.ACTIVE_SOLO]: {
    text: styles.textActive,
    front: styles.frontActive,
    backLeft: styles.backLeftNormal,
    backRight: styles.backRightNormal,
  },
  [DAY_TYPE.ACTIVE_REVERSE]: {
    text: styles.textActive,
    front: styles.frontActive,
    backLeft: styles.backLeftNormal,
    backRight: styles.backRightNormal,
  },
  [DAY_TYPE.NORMAL_LINE]: {
    text: styles.textNormal,
    front: styles.frontNormal,
    backLeft: styles.backLeftActive,
    backRight: styles.backRightActive,
  },
  [DAY_TYPE.NORMAL_LINE_ALLOW]: {
    text: styles.textAllow,
    front: styles.frontNormal,
    backLeft: styles.backLeftActive,
    backRight: styles.backRightActive,
  },
  [DAY_TYPE.NORMAL_ALLOW]: {
    text: styles.textAllow,
    front: styles.frontAllow,
    backLeft: styles.backLeftNormal,
    backRight: styles.backRightNormal,
  },
  [DAY_TYPE.NORMAL_DEFAULT]: {
    text: styles.textNormal,
    front: styles.frontNormal,
    backLeft: styles.backLeftNormal,
    backRight: styles.backRightNormal,
  },
};

interface IOwnProps {
  type: DAY_TYPE;
  order: number;
  style?: ViewStyle;
  onPress: (index: number) => void;
}

function Widget({ type, order, style = {}, onPress }: IOwnProps) {
  const disabled = useMemo(() => {
    return type === DAY_TYPE.NORMAL_LINE || type === DAY_TYPE.NORMAL_DEFAULT;
  }, [type]);

  const { backLeft, backRight, front, text } = useMemo(() => {
    return SWITCH_STYLE[type];
  }, [type]);

  const select = useCallback(() => {
    onPress(order);
  }, [order, onPress]);

  return (
    <TouchableOpacity style={[styles.main, style]} disabled={disabled} onPress={select}>
      <View style={backLeft} />

      <View style={backRight} />

      <View style={front}>
        <Text style={text}>{order}</Text>
      </View>

      {type === DAY_TYPE.ACTIVE_REVERSE && (
        <View style={styles.circle}>
          <Circle />
        </View>
      )}
    </TouchableOpacity>
  );
}

export const CalendarDayView = memo(Widget);
