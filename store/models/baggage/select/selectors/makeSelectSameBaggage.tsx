import { IStoreState } from 'types';
import { createSelector } from 'reselect';
import { createLoggedSelector } from 'utils';

const getTravellerSameBaggage = createLoggedSelector(({ booking }: IStoreState, prop: number) => {
  return booking.travellers[prop].isUnited;
}, false);

export function makeSelectSameBaggage() {
  return createSelector(
    getTravellerSameBaggage,
    createLoggedSelector((sameBaggage: boolean): boolean => {
      return sameBaggage;
    }, false)
  );
}
