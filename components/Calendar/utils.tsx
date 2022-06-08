import Moment from 'moment';
import { useEffect } from 'react';
import { useSelector } from 'view/hooks';

const CALENDAR_LOCALE_EN = {
  calendar: {
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
  },
};

export const getMonthNames = function (): string[] {
  return Moment.months();
};


export const getWeekdayNames = function (): string[] {
  return Moment.weekdaysShort();
};

type TDate = {
  value: number;
  date: string;
};

export const getMonthDays = function (
  firstDay: number,
  maxDays: number,
  year: number,
  month: number,
) {
  const matrix: TDate[][] = [];

  let counter = 1;

  let emptyCounter = 1;

  for (let row = 0; row <= Math.ceil(maxDays / 7); row++) {
    matrix[row] = [];
    for (let col = 0; col < 7; col++) {
      if (row === 0 && col >= firstDay) {
        // Fill in rows only after the first day of the month
        matrix[row][col] = {
          value: counter,
          date: Moment()
            .year(year)
            .month(month)
            .date(counter++)
            .hours(0)
            .minutes(0)
            .seconds(0)
            .milliseconds(0)
            .toString(),
        };
      } else if (row > 0 && counter <= maxDays) {
        // Fill in rows only if the counter's not greater than
        // the number of days in the month
        matrix[row][col] = {
          value: counter,
          date: Moment()
            .year(year)
            .month(month)
            .date(counter++)
            .hours(0)
            .minutes(0)
            .seconds(0)
            .milliseconds(0)
            .toString(),
        };
      } else if (row > 0 && counter > maxDays && col === 0) {
        break;
      } else {
        matrix[row][col] = { value: -1, date: `${year}_${emptyCounter++}` };
      }
    }
  }

  return matrix.filter((arr) => arr.length !== 0);
};

export const getYearData = function (year = Moment().year()) {
  const months = getMonthNames();

  return months.map((item, index) => {
    const startMonthDate = Moment().year(year).month(index).date(1);

    const startWeekDay = startMonthDate.day();

    const countDays = startMonthDate.daysInMonth();

    return {
      title: `${item} ${year}`,
      data: getMonthDays(startWeekDay, countDays, year, index),
    };
  });
};

export const useGetYearDataWithoutPast = function (year = Moment().year()) {
  const firstEventDateMonth = useSelector((state) =>
    Moment(state.programCore.firstEventDate).month(),
  );

  const months = getYearData(year);

  const today = Moment().month();

  return months.filter(
    (item, index) => index >= today && index >= firstEventDateMonth,
  );
};
