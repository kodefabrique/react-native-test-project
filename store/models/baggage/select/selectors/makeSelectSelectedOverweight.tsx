import { IStoreState, IBookingTraveller } from 'types';
import { createSelector } from 'reselect';
import { createLoggedSelector } from 'utils';

const getTravellerBaggage = createLoggedSelector(({ booking }: IStoreState, travellerOrder: number) => {
  return booking.travellers[travellerOrder];
}, null);

export function makeSelectSelectedOverweight() {
  return createSelector(
    getTravellerBaggage,
    createLoggedSelector((traveller: IBookingTraveller) => {
      return traveller.overweight;
    }, null)
  );
}
