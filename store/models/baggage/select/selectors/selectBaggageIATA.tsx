import { ISelectedFareFamily } from 'types';
import { createSelector } from 'reselect';
import { createLoggedSelector } from 'utils';
import { getOrderStack } from '../common';

export const selectBaggageIATA = createSelector(
  getOrderStack,
  createLoggedSelector((stack: ISelectedFareFamily[]): string => {
    return stack[0].flightInfo[0].departure.airport.iata;
  }, '')
);
