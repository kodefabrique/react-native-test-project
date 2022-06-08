import { AreaType, IBookingTraveller } from 'types';
import { createSelector } from 'reselect';
import { createLoggedSelector } from 'utils';
import { getTravellers } from '../common';

export const selectAreaType = createSelector(
  getTravellers,
  createLoggedSelector((travellers: IBookingTraveller[]): AreaType => {
    return travellers.length <= 1 ? AreaType.SOLO : AreaType.MULTI;
  }, AreaType.SOLO)
);
