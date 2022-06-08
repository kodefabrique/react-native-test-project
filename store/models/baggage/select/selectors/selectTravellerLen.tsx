import { IBookingTraveller, IStoreState } from 'types';
import { createSelector } from 'reselect';
import { createLoggedSelector } from 'utils';

const getTravellers = createLoggedSelector(({ booking }: IStoreState) => {
  return booking.travellers;
}, []);

export const selectTravellerLen = createSelector(
  getTravellers,
  createLoggedSelector((travellers: IBookingTraveller[]): number => {
    return travellers.length;
  }, 0)
);
