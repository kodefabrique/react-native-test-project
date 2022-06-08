import React from 'react';
import {
  PriceGraphMounthToggler,
  PriceGraphControls,
  PriceGraphScrollHeader,
  PriceGraphScroll,
} from 'widgets/ModulePriceGraph';
import { HEIGHT_GRAPH } from './constants';
import {
  MinPrices_FlightsMinPricesInPeriod_datesWithLowestPrices as TDatesWithLowestPrices,
  IDateWithPrice,
} from 'types';
import { NAMESPACE, KEYS } from '../translation';
import { useTranslation } from 'react-i18next';

interface IOwnProps {
  selectedDate: TDatesWithLowestPrices | IDateWithPrice;
  openGraphMount: () => void;
  setSelectedDate: (date: TDatesWithLowestPrices | IDateWithPrice) => void;
  doneDate: () => void;
  goToNextScreen: () => void;
  isFrom: boolean;
  isMulti: boolean;
  monthDate: string;
  isInited: boolean;
  setInited: (isInited: boolean) => void;
}

export function CalendarPriceGraphView({
  selectedDate,
  openGraphMount,
  setSelectedDate,
  isFrom,
  doneDate,
  isMulti,
  monthDate,
  goToNextScreen,
  isInited,
  setInited,
}: IOwnProps) {
  const { t } = useTranslation(NAMESPACE);

  const textTypeTrip = isFrom ? t(KEYS.ONE_WAY) : t(KEYS.TOUND_TRIP);

  const textRedirectBtn = isFrom ? t(KEYS.SELECT_RETURN) : t(KEYS.ONE_WAY_BTN);

  return (
    <>
      <PriceGraphMounthToggler
        date={selectedDate?.date}
        clickHandler={openGraphMount}
        text={!isMulti && textTypeTrip}
      />

      <PriceGraphScrollHeader
        isFrom={isFrom}
        date={selectedDate?.date}
        price={selectedDate?.price}
        isInited={isInited}
      />

      <PriceGraphScroll
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        heightGraph={HEIGHT_GRAPH}
        monthDate={monthDate}
        isInited={isInited}
        setInited={setInited}
      />

      <PriceGraphControls
        doneHandler={doneDate}
        textRedirectBtn={textRedirectBtn}
        goToNextScreen={goToNextScreen}
        disableDone={!selectedDate?.price}
        disableSelectReturn={isFrom && !selectedDate?.price}
      />
    </>
  );
}
