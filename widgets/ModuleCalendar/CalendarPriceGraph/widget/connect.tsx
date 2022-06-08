import { connect } from 'react-redux';
import moment from 'moment';
import { CalendarPriceGraphController } from './controller';
import { DATE_FORMAT } from './constants';
import { IStoreState } from 'types';
import { IDispatch } from 'store';

const mapState = ({ search: { startDate, endDate, isMulti }, priceGraph }: IStoreState) => ({
  startDate: startDate ? moment(startDate).format(DATE_FORMAT) : null,
  endDate: endDate ? moment(endDate).format(DATE_FORMAT) : null,
  isLoading: priceGraph.isLoading,
  isMulti,
});

const mapDispatch = ({
  priceGraph: { getPriceGraph },
  search: { setDates },
  calendar: { setDates: setCalendarDates },
}: IDispatch) => ({
  getPriceGraph,
  setCalendarDates,
  setDates,
});

export const CalendarPriceGraphConnect = connect(mapState, mapDispatch)(CalendarPriceGraphController);
