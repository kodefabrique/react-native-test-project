import React, { memo, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Moment from 'moment';
import { useFocusEffect } from '@react-navigation/core';

import { ATypography, CCardTimeLine, createStyles } from 'ui';
import {
  useDispatch,
  useGoToTimelineItemDetails,
  useSelector,
} from 'view/hooks';
import { Palette } from 'theme';
import { WCardRecommendedExcursion } from '../WCardRecommendedExcursion';

const calcDayTitle = function (date: string): string {
  const momentsDiff = Moment(date).diff(Moment(), 'hours');
  if (momentsDiff >= -24 && momentsDiff <= 0) {
    return Moment(date).calendar(Moment());
  }
  if (momentsDiff > 0 && momentsDiff <= 24) {
    return Moment(date).calendar(Moment());
  }
  return Moment(date).fromNow();
};

const Component = function () {
  const pushGetProgramEventsAllDatesAsync = useDispatch(
    (state) => state.programApp.pushGetProgramEventsAllDatesAsync,
  );

  const programEventsAllDatesStatus = useSelector(
    (state) => state.programApp.programEventsAllDatesStatus,
  );

  const timeLine = useSelector((state) => state.programCore.timeLine);

  const shouldRenderSkeleton = useMemo(
    () => programEventsAllDatesStatus === 'processing' && timeLine.length === 0,
    [programEventsAllDatesStatus, timeLine.length],
  );

  const [lastFetchTime, setLastFetchTime] = useState<null | string>(null);

  useFocusEffect(
    useCallback(() => {
      if (
        lastFetchTime === null ||
        Moment().diff(Moment(lastFetchTime), 'minutes') >= 1
      ) {
        pushGetProgramEventsAllDatesAsync();

        setLastFetchTime(Moment().toISOString());
      }
    }, [lastFetchTime, pushGetProgramEventsAllDatesAsync]),
  );

  const cardPressHandle = useGoToTimelineItemDetails();

  return (
    <View style={styles.main}>
      {shouldRenderSkeleton && (
        <SkeletonContent
          layout={[
            {
              key: 0,
              width: '100%',
              height: 76,
              borderRadius: 16,
              marginTop: 10,
            },
          ]}
          isLoading
        />
      )}
      {timeLine
        .filter((day) => !Moment(day.date).isBefore(Moment()))
        .map((day) => {
          return (
            <View key={day.date}>
              <View style={styles.categoryTitle}>
                <ATypography variant="medium" size="header_small">
                  {calcDayTitle(day.date)}
                </ATypography>
                <ATypography
                  variant="medium"
                  size="body_large"
                  style={styles.textGrey}>
                  {Moment(day.date).format('D MMM, ddd').replace('.', '')}
                </ATypography>
              </View>
              {day.events.map((event, index, arr) => {
                return (
                  <React.Fragment key={event.id}>
                    <CCardTimeLine
                      style={[
                        styles.eventCard,
                        index === arr.length - 1 && event.type !== 'HOTEL'
                          ? styles.eventCardLast
                          : undefined,
                      ]}
                      type={event.type}
                      title={event.title ?? ''}
                      subTitle={event.info ?? ''}
                      info={event.subtype === 'tour' ? event.address ?? '' : ''}
                      startDate={event.dateStart}
                      endDate={event.dateEnd}
                      onPress={cardPressHandle({
                        type: event.type,
                        entityId: Number(event.entityId),
                      })}
                      image={event.subtype === 'single' ? event.image : null}
                    />

                    {event.type === 'HOTEL' && (
                      <WCardRecommendedExcursion
                        style={styles.recomendedCard}
                        cityId={event.city}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </View>
          );
        })}
    </View>
  );
};

const styles = createStyles({
  main: {
    flex: 1,
    marginBottom: 20,
  },
  categoryTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  textGrey: {
    color: Palette.secondaryLightest,
  },
  eventCard: {
    marginTop: 1,
  },
  eventCardLast: {
    marginBottom: 21,
  },
  recomendedCard: {
    marginVertical: 20,
  },
});

export const WBlockTimeLine = memo(Component);
