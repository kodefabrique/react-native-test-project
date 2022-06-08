import React, { memo, useMemo } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { DAY_TYPE } from 'types';
import { CalendarDay } from '../../CalendarDay';
import { NAMESPACE, KEYS } from '../translation';
import { styles } from './styles';
import { createArr } from 'utils';
import Moment from 'moment';

const WEEK_TITLES = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

const FORMATE_MONTH = 'MMMM';

const FORMATE_YEAR = 'YYYY';

const START_PREFIX = 's';

const MONTH = 'month';

const DAY = 'd';

interface IOwnProps {
  month: string;
  calcType: (order: number) => DAY_TYPE;
  selectDay: (order: number) => void;
}

function Widget({ month, calcType, selectDay }: IOwnProps) {
  const { t } = useTranslation(NAMESPACE);

  const [monthTitle, yearTitle] = useMemo(() => {
    return [Moment(month).format(FORMATE_MONTH), Moment(month).format(FORMATE_YEAR)];
  }, [month]);

  const momentStartDay = useMemo(() => {
    return +Moment(month).startOf(MONTH).format(DAY);
  }, [month]);

  const daysInMonth = useMemo(() => {
    return Moment(month).daysInMonth();
  }, [month]);

  const start = useMemo(() => {
    return momentStartDay ? momentStartDay - 1 : 6;
  }, [momentStartDay]);

  const preRender = useMemo(() => {
    return createArr(start);
  }, [start]);

  const daysRender = useMemo(() => {
    return createArr(daysInMonth);
  }, [daysInMonth]);

  return (
    <View style={styles.main}>
      <Text>
        <Text style={styles.monthText}>{monthTitle}</Text>

        <Text>{'  '}</Text>

        <Text style={styles.yearText}>{yearTitle}</Text>
      </Text>

      <View style={styles.days}>
        {WEEK_TITLES.map((title: string, index: number) => {
          return (
            <View key={index} style={styles.week}>
              <Text style={styles.weekText}>{t(KEYS[title])}</Text>
            </View>
          );
        })}

        {preRender.map((key) => {
          return <View key={`${START_PREFIX}${key}`} style={styles.emptyDay} />;
        })}

        {daysRender.map((key) => {
          const order = key + 1;
          const type = calcType(order);

          return <CalendarDay key={order} order={order} type={type} onPress={selectDay} style={styles.day} />;
        })}
      </View>
    </View>
  );
}

export const CalendarMonthView = memo(Widget);
