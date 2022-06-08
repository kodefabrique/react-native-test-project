import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ActivityIndicator, Pressable, SectionList, View } from 'react-native';
import Moment from 'moment';

import { ATypography, createStyles } from 'ui';
import { Palette } from 'theme';
import { useDispatch, useScreenBottomPadding, useSelector } from 'view/hooks';

import { getWeekdayNames, useGetYearDataWithoutPast } from './utils';

const keyExtractor = (item: any[], index: number) => {
  const key = item.find((value) => value.date.length > 0);

  return key?.date + index;
};

const TODAY = Moment().toString();

interface IProps {
  onSelectDate: (date: string) => void;
}

// TODO refactor as widget
const Component = function ({ onSelectDate }: IProps) {
  const listRef = useRef<SectionList>(null);

  const paddingBottom = useScreenBottomPadding(true);

  const [selectedDate, setSelectedDate] = useState(TODAY);

  const pushGetProgramEventsSingleDateAsync = useDispatch(
    (state) => state.programApp.pushGetProgramEventsSingleDateAsync,
  );

  const eventTourDates = useSelector(
    (state) => state.programCore.eventTourDates,
  );

  const freeTourDates = useSelector((state) => state.programCore.freeTourDates);

  const singleEvents = useSelector((state) => state.programCore.singleEvents);

  const calendarStatus = useSelector(
    (state) => state.programApp.calendarStatus,
  );

  const eventDates = useMemo(
    () =>
      [eventTourDates, singleEvents]
        .flat()
        .filter((event): event is string => event !== null),
    [eventTourDates, singleEvents],
  );

  const firstEventDate = useSelector(
    (state) => state.programCore.firstEventDate,
  );

  const SECTIONS = useGetYearDataWithoutPast();

  const onPressDate = useCallback(
    (val: any, sectionIndex: number, itemIndex: number) => () => {
      if (listRef.current) {
        listRef.current.scrollToLocation({
          sectionIndex: sectionIndex,
          itemIndex: itemIndex,
          viewPosition: 0,
        });
      }
      setSelectedDate(val);

      onSelectDate(val);
    },
    [onSelectDate],
  );

  useEffect(() => {
    if (eventDates.includes(selectedDate)) {
      pushGetProgramEventsSingleDateAsync(selectedDate);
    }
  }, [eventDates, pushGetProgramEventsSingleDateAsync, selectedDate]);

  useEffect(() => {
    if (firstEventDate) {
      const stringedDate = Moment(firstEventDate)
        .hours(0)
        .minutes(0)
        .seconds(0)
        .milliseconds(0)
        .toString();

      setSelectedDate(stringedDate);

      onSelectDate(stringedDate);

      // код ниже для автоскрола при инициализации, если понадобится - доработать
      const sectionIndex = SECTIONS.findIndex(({ data }) =>
        data
          .flat()
          .map(({ date }) => date)
          .includes(stringedDate),
      );

      if (listRef.current) {
        listRef.current.scrollToLocation({
          sectionIndex: sectionIndex,
          itemIndex: 0,
          viewPosition: 0,
        });
      }
    }
  }, [SECTIONS, firstEventDate, onSelectDate]);

  const renderItem = useCallback(
    ({ item, index, section }) => {
      const sectionIndex = SECTIONS.findIndex(
        ({ title }) => title === section.title,
      );
      return (
        <View style={styles.containerRow}>
          {item.map((day: any) => {
            const isSelected = day.date === selectedDate;

            let stylesWrapper;
            let styleText;

            if (isSelected) {
              stylesWrapper = styles.wrapperDateSelected;
              styleText = styles.dateColorSelected;
            } else if (eventDates.includes(day.date)) {
              stylesWrapper = styles.wrapperDateEvent;
              styleText = styles.dateColorSelected;
            } else if (freeTourDates?.includes(day.date)) {
              stylesWrapper = styles.wrapperDateFree;
              styleText = styles.dateColorFree;
            } else {
              stylesWrapper = styles.wrapperDate;
              styleText = styles.dateColor;
            }

            return (
              <View style={styles.itemRow} key={day.date}>
                {day.value !== -1 && (
                  <Pressable
                    style={stylesWrapper}
                    onPress={onPressDate(day.date, sectionIndex, index)}>
                    <ATypography
                      variant="regular"
                      size="body_medium"
                      style={styleText}>
                      {day.value}
                    </ATypography>
                  </Pressable>
                )}
              </View>
            );
          })}
        </View>
      );
    },
    [SECTIONS, eventDates, freeTourDates, onPressDate, selectedDate],
  );

  const renderWeekdays = useCallback(({ item }) => {
    return (
      <View style={styles.containerRow}>
        {item.map((day: string) => (
          <View key={day} style={styles.itemRow}>
            <ATypography
              variant="regular"
              size="body_medium"
              style={styles.textWeekday}>
              {day}
            </ATypography>
          </View>
        ))}
      </View>
    );
  }, []);

  const renderSectionHeader = useCallback(
    ({ section: { title } }) => {
      return (
        <View key={title}>
          <ATypography
            variant="medium"
            size="body_medium"
            style={styles.header}>
            {title}
          </ATypography>
          {renderWeekdays({ item: getWeekdayNames() })}
        </View>
      );
    },
    [renderWeekdays],
  );

  const onScrollToIndexFailed = useCallback((error) => {
    console.log(error);
    listRef.current?.scrollToLocation({
      itemIndex: 0,
      sectionIndex: 0,
      animated: true,
    });
  }, []);

  return (
    <View style={styles.containerCalendar}>
      {calendarStatus === 'processing' && eventDates.length === 0 && (
        <ActivityIndicator
          size="large"
          color={Palette.primary}
          style={styles.spinner}
        />
      )}
      <SectionList
        contentContainerStyle={{ paddingBottom: paddingBottom }}
        ref={listRef}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        keyExtractor={keyExtractor}
        sections={SECTIONS}
        extraData={eventDates}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />
    </View>
  );
};

const styles = createStyles({
  containerCalendar: {
    height: '100%',
    width: '100%',
    backgroundColor: Palette.primary,
    paddingHorizontal: 12,
  },
  header: {
    flex: 1,
    paddingVertical: 8,
    color: Palette.secondaryLighter,
    backgroundColor: Palette.primary,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  containerRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  itemRow: {
    flex: 1,
    alignItems: 'center',
  },
  dateColor: {
    color: Palette.primaryDarkest,
  },
  dateColorSelected: {
    color: Palette.primary,
  },
  dateColorFree: {
    color: Palette.secondary,
  },
  wrapperDate: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperDateSelected: {
    width: 32,
    height: 32,
    backgroundColor: Palette.accentSecondary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperDateEvent: {
    width: 32,
    height: 32,
    backgroundColor: Palette.accentPrimary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperDateFree: {
    width: 32,
    height: 32,
    backgroundColor: Palette.primary,
    borderColor: Palette.accentPrimary,
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWeekday: {
    color: Palette.secondaryLightest,
  },
  spinner: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

export const Calendar = memo(Component);
