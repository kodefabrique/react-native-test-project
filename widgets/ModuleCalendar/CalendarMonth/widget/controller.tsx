import React, { PureComponent } from 'react';
import { ICalendarMonth, DAY_TYPE, ICalendarMonthProps } from 'types';
import { CalendarMonthView } from './view';
import Moment from 'moment';

interface IOwnProps {
  dateMonth: ICalendarMonth;
  range: ICalendarMonthProps;
  select: (payload: string) => void;
}

export class CalendarMonthController extends PureComponent<IOwnProps> {
  calcMomentFromOrder = (order: number) => {
    const { dateMonth } = this.props;
    const { month } = dateMonth;

    const newDay = Moment(month);
    const monthDay = +newDay.format('DD');
    const nextDay = newDay.add(order - monthDay, 'days');
    return nextDay.toISOString();
  };

  calcType = (order: number) => {
    const { range, dateMonth } = this.props;
    const { departure, returning } = range;
    const departureMoment = Moment(departure);
    const returningMoment = Moment(returning);

    const dayMoment = Moment(this.calcMomentFromOrder(order));
    const isAllow = dateMonth.days[order - 1].allow;

    if (returning && departure && departureMoment.isSame(returning) && dayMoment.isSame(departure)) {
      return DAY_TYPE.ACTIVE_REVERSE;
    }

    if (returning && departure && dayMoment.isSame(departure)) {
      return DAY_TYPE.ACTIVE_START;
    }

    if (departure && returning && dayMoment.isSame(returning)) {
      return DAY_TYPE.ACTIVE_END;
    }

    if (!returning && departure && dayMoment.isSame(departure)) {
      return DAY_TYPE.ACTIVE_SOLO;
    }

    if (
      returning &&
      departure &&
      departureMoment.isBefore(dayMoment) &&
      returningMoment.isAfter(dayMoment) &&
      isAllow
    ) {
      return DAY_TYPE.NORMAL_LINE_ALLOW;
    }

    if (returning && departure && departureMoment.isBefore(dayMoment) && returningMoment.isAfter(dayMoment)) {
      return DAY_TYPE.NORMAL_LINE;
    }

    return isAllow ? DAY_TYPE.NORMAL_ALLOW : DAY_TYPE.NORMAL_DEFAULT;
  };

  selectDay = (order: number) => {
    const { select } = this.props;

    const nextDay = this.calcMomentFromOrder(order);
    select(nextDay);
  };

  render() {
    const { dateMonth } = this.props;
    const { month } = dateMonth;

    return <CalendarMonthView month={month} calcType={this.calcType} selectDay={this.selectDay} />;
  }
}
