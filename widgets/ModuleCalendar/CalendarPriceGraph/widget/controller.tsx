import React, { Component } from 'react';
import moment from 'moment';
import { PriceGraphByMonthModal } from 'widgets/ModulePriceGraph';
import { SharedLoader } from 'widgets/ModuleShared';
import {
  IDates,
  MinPrices_FlightsMinPricesInPeriod_datesWithLowestPrices as TDatesWithLowestPrices,
  IDateWithPrice,
  ICalendarMonthProps,
  IPriceGraphRequestVariavles,
} from 'types';
import { DATE_FORMAT } from './constants';
import { CalendarPriceGraphView } from './view';

interface IState {
  selectedDate: TDatesWithLowestPrices | IDateWithPrice;
  monthDate: string;
  isVisibleModal: boolean;
  isFrom: boolean;
  isInited: boolean;
}

interface IConnectProps {
  startDate: string | null;
  endDate: string | null;
  isMulti: boolean;
  isLoading: boolean;
  setCalendarDates: (payload: ICalendarMonthProps) => void;
  getPriceGraph: (payload: IPriceGraphRequestVariavles) => void;
  setDates: (params: IDates) => void;
}

interface IOwnProps {
  goBack: () => void;
}

export class CalendarPriceGraphController extends Component<IConnectProps & IOwnProps, IState> {
  constructor(props: IConnectProps & IOwnProps) {
    super(props);
    const { startDate } = props;
    const selectedDateValue = startDate ? startDate : moment(new Date(Date.now())).format(DATE_FORMAT);

    this.state = {
      selectedDate: {
        date: selectedDateValue,
        price: null,
      },
      monthDate: '',
      isVisibleModal: false,
      isFrom: true,
      isInited: false,
    };
  }

  componentDidMount() {
    this.getQueryPrice();
    this.setDefaultCalendarDates();
  }

  setInited = (isInited: boolean) => {
    this.setState({
      isInited,
    });
  };

  setDefaultCalendarDates = () => {
    const { setCalendarDates, startDate, endDate } = this.props;
    const calendarDates = { departure: startDate, returning: endDate };
    setCalendarDates(calendarDates);
  };

  getQueryPrice = () => {
    const { startDate, getPriceGraph } = this.props;
    const { isFrom } = this.state;

    const date = isFrom ? moment(Date.now()).format(DATE_FORMAT) : startDate;

    getPriceGraph({ date, isCache: false });
  };

  goBack = () => {
    const { goBack } = this.props;
    goBack();
  };

  openGraphMount = () => {
    this.setState({ isVisibleModal: true });
  };

  closeModal = () => this.setState({ isVisibleModal: false });

  doneTwoDate = () => {
    const {
      selectedDate: { date },
      isFrom,
    } = this.state;
    const { setDates, startDate, setCalendarDates } = this.props;

    const datesValues = isFrom
      ? { start: moment(date, DATE_FORMAT), end: null }
      : { start: moment(startDate, DATE_FORMAT), end: moment(date, DATE_FORMAT) };

    const calendarDates = isFrom
      ? { departure: moment(date, DATE_FORMAT).toISOString(), returning: null }
      : { departure: moment(startDate, DATE_FORMAT).toISOString(), returning: moment(date, DATE_FORMAT).toISOString() };

    setCalendarDates(calendarDates);
    setDates(datesValues);
  };

  doneOneDate = () => {
    const {
      selectedDate: { date },
    } = this.state;
    const { setDates, setCalendarDates } = this.props;

    const datesValues = { start: moment(date, DATE_FORMAT), end: null };

    const calendarDates = { departure: moment(date, DATE_FORMAT).toISOString(), returning: null };

    setCalendarDates(calendarDates);
    setDates(datesValues);
  };

  doneHandler = async () => {
    await this.doneTwoDate();
    this.goBack();
  };

  redirectReurnSelectGraph = async () => {
    await this.doneOneDate();
    await this.setState({ isFrom: false });
    this.getQueryPrice();
  };

  oneWayHandler = async () => {
    this.goBack();
  };

  setSelectedDate = (selectedDate: TDatesWithLowestPrices | IDateWithPrice) => {
    this.setState({
      selectedDate,
    });
  };

  changeMonth = (selectedDate: TDatesWithLowestPrices | IDateWithPrice) => {
    this.setState({
      selectedDate,
      monthDate: selectedDate?.date,
    });
  };

  render() {
    const { isFrom, isVisibleModal, selectedDate, monthDate, isInited } = this.state;
    const { isMulti, isLoading } = this.props;

    return !isLoading ? (
      <>
        <CalendarPriceGraphView
          monthDate={monthDate}
          selectedDate={selectedDate}
          openGraphMount={this.openGraphMount}
          setSelectedDate={this.setSelectedDate}
          isFrom={isFrom}
          doneDate={this.doneHandler}
          isMulti={isMulti}
          goToNextScreen={isFrom ? this.redirectReurnSelectGraph : this.oneWayHandler}
          isInited={isInited}
          setInited={this.setInited}
        />

        <PriceGraphByMonthModal
          isVisibleModal={isVisibleModal}
          closeModal={this.closeModal}
          changeMonth={this.changeMonth}
          selectedDate={selectedDate?.date}
        />
      </>
    ) : (
      <SharedLoader />
    );
  }
}
